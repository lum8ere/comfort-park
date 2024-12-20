package handlers

import (
	"backed-api/pkg/context"
	"backed-api/pkg/db/model"
	"backed-api/pkg/db/storage"
	"fmt"
	"net/http"
	"strconv"
	"time"

	"github.com/go-chi/chi"
	"github.com/google/uuid"
	"go.uber.org/zap"
)

func GetBuildingsHandler(appCtx *context.AppContext, r *http.Request) (interface{}, error) {
	appCtx.Logger.Info("Handling Buildings request")

	// Получаем данные из базы данных
	var buildings []model.Building
	if err := appCtx.DB.Preload("Photos").Find(&buildings).Error; err != nil {
		appCtx.Logger.Error("Failed to fetch buildings", zap.Error(err))
		return nil, err
	}

	type BuildingResponse struct {
		ID        string    `json:"id"`
		Name      string    `json:"name"`
		Size      string    `json:"size"`
		Floors    int32     `json:"floors"`
		Area      float64   `json:"area"`
		Material  string    `json:"material"`
		Category  string    `json:"category"`
		Price     int32     `json:"price"`
		Photos    []string  `json:"photos"`
		CreatedAt time.Time `json:"created_at"`
	}

	var response []BuildingResponse
	for _, b := range buildings {
		var photos []string
		for _, p := range b.Photos {
			photos = append(photos, p.URL) // Предполагается, что URL уже является доступным
		}
		response = append(response, BuildingResponse{
			ID:        b.ID,
			Name:      b.Name,
			Size:      b.Size,
			Floors:    b.Floors,
			Area:      b.Area,
			Price:     b.Price,
			Photos:    photos,
			CreatedAt: b.CreatedAt,
		})
	}

	appCtx.Logger.Info("Successfully fetched buildings", zap.Int("count", len(buildings)))
	return response, nil
}

func GetBuildingByIDHandler(appCtx *context.AppContext, r *http.Request) (interface{}, error) {
	appCtx.Logger.Info("Handling Building by id request")

	// Извлекаем параметр 'id' из URL
	id := chi.URLParam(r, "id")

	appCtx.Logger.Info("Handling Building by id request", zap.String("id", id))
	if id == "" {
		appCtx.Logger.Warn("ID parameter is missing")
		return map[string]string{"error": "ID parameter is missing"}, nil
	}

	// Получаем данные из базы данных
	var building model.Building
	if err := appCtx.DB.Preload("Photos").Where("id = ?", id).Find(&building).Error; err != nil {
		appCtx.Logger.Error("Failed to fetch building", zap.Error(err))
		return nil, err
	}

	type BuildingResponse struct {
		ID          string    `json:"id"`
		Name        string    `json:"name"`
		Size        string    `json:"size"`
		Floors      int32     `json:"floors"`
		Description string    `json:"description"`
		Area        float64   `json:"area"`
		Material    string    `json:"material"`
		Category    string    `json:"category"`
		Price       int32     `json:"price"`
		Photos      []string  `json:"photos"`
		CreatedAt   time.Time `json:"created_at"`
	}

	var response BuildingResponse
	var photos []string
	for _, p := range building.Photos {
		photos = append(photos, p.URL) // Предполагается, что URL уже является доступным
	}
	response = BuildingResponse{
		ID:          building.ID,
		Name:        building.Name,
		Size:        building.Size,
		Floors:      building.Floors,
		Area:        building.Area,
		Description: building.Description,
		Price:       building.Price,
		Photos:      photos,
		CreatedAt:   building.CreatedAt,
	}

	appCtx.Logger.Info("Successfully fetched building by id")
	return response, nil
}

// CreateBuildingHandler обрабатывает создание нового здания
// CreateBuildingRequest определяет структуру входящего JSON запроса для создания здания
type CreateBuildingRequest struct {
	Name        string `json:"name" validate:"required"`
	Size        string `json:"size"`
	Floors      int32  `json:"floors"`
	Description string `json:"description"`
	Area        string `json:"area"`
	Price       string `json:"price"`
}

func CreateBuildingHandler(appCtx *context.AppContext, r *http.Request) (interface{}, error) {
	appCtx.Logger.Info("Handling Create Building request")

	// Ограничение размера загружаемых файлов (например, 20MB)
	const maxUploadSize = 20 << 20 // 20 MB
	if err := r.ParseMultipartForm(maxUploadSize); err != nil {
		appCtx.Logger.Warn("Ошибка парсинга формы", zap.Error(err))
		return map[string]string{"error": "Invalid form data"}, nil
	}

	// Извлечение полей формы
	name := r.FormValue("name")
	if name == "" {
		return map[string]string{"error": "Name is required"}, nil
	}

	size := r.FormValue("size")
	floorsStr := r.FormValue("floors")
	var floors int32
	if floorsStr != "" {
		parsedFloors, err := strconv.ParseInt(floorsStr, 10, 32)
		if err != nil {
			appCtx.Logger.Warn("Неверный формат price", zap.Error(err))
			return map[string]string{"error": "Invalid price value"}, nil
		}
		floors = int32(parsedFloors)
	}
	description := r.FormValue("description")

	areaStr := r.FormValue("area")
	var area float64
	if areaStr != "" {
		var err error
		area, err = strconv.ParseFloat(areaStr, 64)
		if err != nil {
			appCtx.Logger.Warn("Неверный формат area", zap.Error(err))
			return map[string]string{"error": "Invalid area value"}, nil
		}
	}

	// Парсинг поля price как int32
	priceStr := r.FormValue("price")
	var price int32
	if priceStr != "" {
		parsedPrice, err := strconv.ParseInt(priceStr, 10, 32)
		if err != nil {
			appCtx.Logger.Warn("Неверный формат price", zap.Error(err))
			return map[string]string{"error": "Invalid price value"}, nil
		}
		price = int32(parsedPrice)
	}

	// Создание нового объекта Building
	newBuilding := model.Building{
		Name:        name,
		Size:        size,
		Description: description,
		Area:        area,
		Floors:      floors,
		Price:       price,
		Photos:      []model.Photo{},
	}

	// Сохранение здания в базе данных для получения ID
	if err := appCtx.DB.Create(&newBuilding).Error; err != nil {
		appCtx.Logger.Error("Failed to create building", zap.Error(err))
		return nil, fmt.Errorf("failed to create building")
	}

	// Обработка загружаемых файлов
	files := r.MultipartForm.File["photos"]
	if len(files) > 0 {
		for _, fileHeader := range files {
			file, err := fileHeader.Open()
			if err != nil {
				appCtx.Logger.Warn("Ошибка открытия файла", zap.Error(err))
				continue // Пропускаем файл и продолжаем обработку остальных
			}
			defer file.Close()

			// Генерация уникального имени файла
			objectName := uuid.New().String() + "_" + fileHeader.Filename

			// Загрузка файла в MinIO
			bucketName := "park-comfort" // Замените на ваше название бакета
			fileURL, err := storage.UploadFile(bucketName, objectName, file, fileHeader.Size)
			if err != nil {
				appCtx.Logger.Error("Ошибка загрузки файла в бакет", zap.Error(err))
				continue // Пропускаем файл и продолжаем обработку остальных
			}

			// Создание записи фотографии
			photo := model.Photo{
				URL:        fileURL,
				BuildingID: newBuilding.ID,
				IsGallery:  false, // Можно настроить логику для каждой фотографии отдельно, если нужно
			}

			// Добавление фотографии к зданию
			newBuilding.Photos = append(newBuilding.Photos, photo)
		}

		// Сохранение фотографий в базе данных
		if err := appCtx.DB.Save(&newBuilding).Error; err != nil {
			appCtx.Logger.Error("Ошибка сохранения фотографий в базе данных", zap.Error(err))
			return nil, fmt.Errorf("failed to save photos")
		}
	}

	appCtx.Logger.Info("Successfully created new building", zap.String("id", newBuilding.ID))
	return map[string]string{"message": "Building created successfully", "id": newBuilding.ID}, nil
}

func UpdateBuildingHandler(appCtx *context.AppContext, r *http.Request) (interface{}, error) {
	id := chi.URLParam(r, "id")
	if id == "" {
		return map[string]string{"error": "ID parameter is missing"}, nil
	}

	// Ограничение размера загружаемых файлов (например, 20MB)
	const maxUploadSize = 20 << 20 // 20 MB
	if err := r.ParseMultipartForm(maxUploadSize); err != nil {
		appCtx.Logger.Warn("Ошибка парсинга формы", zap.Error(err))
		return map[string]string{"error": "Invalid form data"}, nil
	}

	// Находим существующее здание
	var building model.Building
	if err := appCtx.DB.Where("id = ?", id).Preload("Photos").First(&building).Error; err != nil {
		appCtx.Logger.Warn("Building not found", zap.Error(err))
		return map[string]string{"error": "Building not found"}, nil
	}

	// Обновляем поля
	if name := r.FormValue("name"); name != "" {
		building.Name = name
	}
	if size := r.FormValue("size"); size != "" {
		building.Size = size
	}
	if floorsStr := r.FormValue("floors"); floorsStr != "" {
		parsedFloors, err := strconv.ParseInt(floorsStr, 10, 32)
		if err == nil {
			building.Floors = int32(parsedFloors)
		}
	}
	if areaStr := r.FormValue("area"); areaStr != "" {
		area, err := strconv.ParseFloat(areaStr, 64)
		if err == nil {
			building.Area = area
		}
	}
	if desc := r.FormValue("description"); desc != "" {
		building.Description = desc
	}
	if priceStr := r.FormValue("price"); priceStr != "" {
		parsedPrice, err := strconv.ParseInt(priceStr, 10, 32)
		if err == nil {
			building.Price = int32(parsedPrice)
		}
	}
	if isActiveStr := r.FormValue("is_active"); isActiveStr != "" {
		building.IsActive = (isActiveStr == "true")
	}

	// Обновим существующую запись в БД
	if err := appCtx.DB.Save(&building).Error; err != nil {
		appCtx.Logger.Error("Failed to update building", zap.Error(err))
		return nil, fmt.Errorf("failed to update building")
	}

	// Если есть новые файлы, то можно добавить их тоже
	files := r.MultipartForm.File["photos"]
	if len(files) > 0 {
		for _, fileHeader := range files {
			file, err := fileHeader.Open()
			if err != nil {
				appCtx.Logger.Warn("Ошибка открытия файла", zap.Error(err))
				continue
			}
			defer file.Close()

			objectName := uuid.New().String() + "_" + fileHeader.Filename

			bucketName := "park-comfort"
			fileURL, err := storage.UploadFile(bucketName, objectName, file, fileHeader.Size)
			if err != nil {
				appCtx.Logger.Error("Ошибка загрузки файла", zap.Error(err))
				continue
			}

			photo := model.Photo{
				URL:        fileURL,
				BuildingID: building.ID,
				IsGallery:  false,
			}

			// Добавим фото к зданию
			building.Photos = append(building.Photos, photo)
		}

		// Сохраняем изменения (новые фото)
		if err := appCtx.DB.Save(&building).Error; err != nil {
			appCtx.Logger.Error("Failed to save building photos", zap.Error(err))
			return nil, fmt.Errorf("failed to save building photos")
		}
	}

	return map[string]string{"message": "Building updated successfully"}, nil
}

func DeleteBuildingHandler(appCtx *context.AppContext, r *http.Request) (interface{}, error) {
	id := chi.URLParam(r, "id")
	if id == "" {
		return map[string]string{"error": "ID parameter is missing"}, nil
	}

	var building model.Building
	if err := appCtx.DB.Where("id = ?", id).First(&building).Error; err != nil {
		appCtx.Logger.Warn("Building not found", zap.Error(err))
		return map[string]string{"error": "Building not found"}, nil
	}

	if err := appCtx.DB.Delete(&building).Error; err != nil {
		appCtx.Logger.Error("Failed to delete building", zap.Error(err))
		return nil, fmt.Errorf("failed to delete building")
	}

	return map[string]string{"message": "Building deleted successfully"}, nil
}
