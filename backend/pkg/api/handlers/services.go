package handlers

import (
	"backed-api/pkg/context"
	"backed-api/pkg/db/model"
	"encoding/json"
	"net/http"

	"github.com/go-chi/chi"
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
type CreateServiceRequest struct {
	Name        string  `json:"name" validate:"required"`
	Description string  `json:"description"`
	Price       float64 `json:"price" validate:"required"`
	ImageURL    string  `json:"image_url" validate:"required"`
	IsActive    *bool   `json:"is_active"` // Указатель позволяет отличить отсутствие поля от значения false
}

// CreateServiceHandler обрабатывает создание нового сервиса
func CreateServiceHandler(appCtx *context.AppContext, r *http.Request) (interface{}, error) {
	appCtx.Logger.Info("Handling Create Service request")

	var req CreateServiceRequest
	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		appCtx.Logger.Warn("Invalid request payload", zap.Error(err))
		return map[string]string{"error": "Invalid request payload"}, nil
	}

	// Валидация обязательных полей
	if req.Name == "" || req.Price == 0 || req.ImageURL == "" {
		appCtx.Logger.Warn("Missing required fields in request")
		return map[string]string{"error": "Missing required fields"}, nil
	}

	// Установка значения по умолчанию для IsActive, если оно не указано
	isActive := true
	if req.IsActive != nil {
		isActive = *req.IsActive
	}

	// Создание нового объекта Service
	newService := model.Service{
		Name:        req.Name,
		Description: req.Description,
		Price:       req.Price,
		ImageURL:    req.ImageURL,
		IsActive:    isActive,
	}

	// Сохранение в базе данных
	if err := appCtx.DB.Create(&newService).Error; err != nil {
		appCtx.Logger.Error("Failed to create service", zap.Error(err))
		return nil, err
	}

	appCtx.Logger.Info("Successfully created new service", zap.String("id", newService.ID))
	return map[string]string{
		"message": "Service created successfully",
		"id":      newService.ID,
	}, nil
}
