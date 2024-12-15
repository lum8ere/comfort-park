package handlers

import (
	"backed-api/pkg/context"
	"backed-api/pkg/db/model"
	"backed-api/pkg/db/storage"
	"net/http"
	"strconv"

	"github.com/go-chi/chi"
	"github.com/google/uuid"
	"go.uber.org/zap"
)

func GetServiceHandler(appCtx *context.AppContext, r *http.Request) (interface{}, error) {
	appCtx.Logger.Info("Handling Service request")

	// Получаем данные из базы данных
	var services []model.Service
	if err := appCtx.DB.Find(&services).Error; err != nil {
		appCtx.Logger.Error("Failed to fetch services", zap.Error(err))
		return nil, err
	}

	appCtx.Logger.Info("Successfully fetched services", zap.Int("count", len(services)))
	return services, nil
}

func GetServiceByIDHandler(appCtx *context.AppContext, r *http.Request) (interface{}, error) {
	appCtx.Logger.Info("Handling service by id request")

	// Извлекаем параметр 'id' из URL
	id := chi.URLParam(r, "id")

	appCtx.Logger.Info("Handling service by id request", zap.String("id", id))
	if id == "" {
		appCtx.Logger.Warn("ID parameter is missing")
		return map[string]string{"error": "ID parameter is missing"}, nil
	}

	// Получаем данные из базы данных
	var service model.Service
	if err := appCtx.DB.Where("id = ?", id).Find(&service).Error; err != nil {
		appCtx.Logger.Error("Failed to fetch service", zap.Error(err))
		return nil, err
	}

	appCtx.Logger.Info("Successfully fetched service by id")
	return service, nil
}

// CreateServiceRequest определяет структуру входящего JSON запроса для создания сервиса
type CreateServiceForm struct {
	Name        string  `json:"name"`
	Description string  `json:"description"`
	Price       float64 `json:"price"`
	IsActive    *bool   `json:"is_active"`
}

// CreateServiceHandler обрабатывает создание нового сервиса
func CreateServiceHandler(appCtx *context.AppContext, r *http.Request) (interface{}, error) {
	appCtx.Logger.Info("Handling Create Service request")

	// Ограничение размера загружаемых файлов (например, 10MB)
	const maxUploadSize = 10 << 20 // 10 MB
	if err := r.ParseMultipartForm(maxUploadSize); err != nil {
		appCtx.Logger.Warn("Ошибка парсинга формы", zap.Error(err))
		return nil, nil
	}

	// Извлечение полей формы
	name := r.FormValue("name")
	if name == "" {
		appCtx.Logger.Warn("Missing required field: name")
		return nil, nil
	}

	description := r.FormValue("description")

	priceStr := r.FormValue("price")
	if priceStr == "" {
		appCtx.Logger.Warn("Missing required field: price")
		return nil, nil
	}

	price, err := strconv.ParseFloat(priceStr, 64)
	if err != nil {
		appCtx.Logger.Warn("Invalid price format", zap.Error(err))
		return nil, nil
	}

	isActive := true // Значение по умолчанию
	isActiveStr := r.FormValue("is_active")
	if isActiveStr != "" {
		isActiveParsed, err := strconv.ParseBool(isActiveStr)
		if err != nil {
			appCtx.Logger.Warn("Invalid is_active format, defaulting to true", zap.Error(err))
			// isActive остаётся true
		} else {
			isActive = isActiveParsed
		}
	}

	// Извлечение файла изображения из формы
	file, header, err := r.FormFile("image")
	if err != nil {
		appCtx.Logger.Warn("Error retrieving the file from form", zap.Error(err))
		return nil, nil
	}
	defer file.Close()

	// Генерация уникального имени файла
	objectName := uuid.New().String() + "_" + header.Filename

	// Загрузка файла в MinIO
	bucketName := "park-comfort" // Замените на ваше название бакета
	fileURL, err := storage.UploadFile(bucketName, objectName, file, header.Size)
	if err != nil {
		appCtx.Logger.Error("Error uploading file to bucket", zap.Error(err))
		return nil, nil
	}

	// Создание нового объекта Service
	newService := model.Service{
		Name:        name,
		Description: description,
		Price:       price,
		ImageURL:    fileURL,
		IsActive:    isActive,
	}

	// Сохранение в базе данных
	if err := appCtx.DB.Create(&newService).Error; err != nil {
		appCtx.Logger.Error("Failed to create service", zap.Error(err))
		return nil, nil
	}

	appCtx.Logger.Info("Successfully created new service", zap.String("id", newService.ID))
	return map[string]string{
		"message": "Service created successfully",
		"id":      newService.ID,
	}, nil
}

func UpdateServiceHandler(appCtx *context.AppContext, r *http.Request) (interface{}, error) {
	id := chi.URLParam(r, "id")
	if id == "" {
		appCtx.Logger.Warn("ID parameter is missing for update service")
		return map[string]string{"error": "ID parameter is missing"}, nil
	}

	const maxUploadSize = 10 << 20 // 10MB
	if err := r.ParseMultipartForm(maxUploadSize); err != nil {
		appCtx.Logger.Warn("Error parsing form", zap.Error(err))
		return map[string]string{"error": "Invalid form data"}, nil
	}

	// Найдём существующую услугу
	var service model.Service
	if err := appCtx.DB.Where("id = ?", id).First(&service).Error; err != nil {
		appCtx.Logger.Warn("Service not found", zap.Error(err))
		return map[string]string{"error": "Service not found"}, nil
	}

	// Обновим поля, если они переданы
	if name := r.FormValue("name"); name != "" {
		service.Name = name
	}
	if description := r.FormValue("description"); description != "" {
		service.Description = description
	}
	if priceStr := r.FormValue("price"); priceStr != "" {
		if price, err := strconv.ParseFloat(priceStr, 64); err == nil {
			service.Price = price
		} else {
			appCtx.Logger.Warn("Invalid price format, skipping update", zap.Error(err))
		}
	}
	if isActiveStr := r.FormValue("is_active"); isActiveStr != "" {
		if active, err := strconv.ParseBool(isActiveStr); err == nil {
			service.IsActive = active
		} else {
			appCtx.Logger.Warn("Invalid is_active format, skipping update", zap.Error(err))
		}
	}

	// Проверим, передан ли новый файл image
	file, header, err := r.FormFile("image")
	if err == nil {
		// Если файл передан, заменим существующую картинку
		defer file.Close()
		objectName := uuid.New().String() + "_" + header.Filename
		bucketName := "park-comfort"
		fileURL, err := storage.UploadFile(bucketName, objectName, file, header.Size)
		if err != nil {
			appCtx.Logger.Error("Error uploading service image", zap.Error(err))
			return map[string]string{"error": "Failed to upload image"}, nil
		}
		service.ImageURL = fileURL
	} else {
		// err может быть ErrMissingFile, если image не был передан, это не ошибка — просто не обновляем
		if err != http.ErrMissingFile {
			appCtx.Logger.Warn("Error retrieving image file", zap.Error(err))
		}
	}

	// Сохраняем изменения
	if err := appCtx.DB.Save(&service).Error; err != nil {
		appCtx.Logger.Error("Failed to update service", zap.Error(err))
		return map[string]string{"error": "Failed to update service"}, nil
	}

	return map[string]string{"message": "Service updated successfully"}, nil
}

func DeleteServiceHandler(appCtx *context.AppContext, r *http.Request) (interface{}, error) {
	id := chi.URLParam(r, "id")
	if id == "" {
		appCtx.Logger.Warn("ID parameter is missing for delete service")
		return map[string]string{"error": "ID parameter is missing"}, nil
	}

	var service model.Service
	if err := appCtx.DB.Where("id = ?", id).First(&service).Error; err != nil {
		appCtx.Logger.Warn("Service not found", zap.Error(err))
		return map[string]string{"error": "Service not found"}, nil
	}

	if err := appCtx.DB.Delete(&service).Error; err != nil {
		appCtx.Logger.Error("Failed to delete service", zap.Error(err))
		return map[string]string{"error": "Failed to delete service"}, nil
	}

	return map[string]string{"message": "Service deleted successfully"}, nil
}
