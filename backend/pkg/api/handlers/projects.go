package handlers

import (
	"backed-api/pkg/context"
	"backed-api/pkg/db/model"
	"encoding/json"
	"net/http"

	"github.com/go-chi/chi"
	"github.com/google/uuid"
	"go.uber.org/zap"
)

// CreateProjectReviewRequest определяет структуру запроса для создания отзыва к проекту
type CreateProjectReviewRequest struct {
	FirstName string   `json:"first_name" validate:"required"`
	LastName  string   `json:"last_name" validate:"required"`
	Comment   string   `json:"comment" validate:"required"`
	Photos    []string `json:"photos"`
}

// CreateProjectRequest определяет структуру запроса для создания проекта
type CreateProjectRequest struct {
	Name        string                       `json:"name" validate:"required"`
	Description string                       `json:"description"`
	PhotoURLs   []string                     `json:"photo_urls"`
	Reviews     []CreateProjectReviewRequest `json:"reviews"`
}

func GetProjectsHandler(appCtx *context.AppContext, r *http.Request) (interface{}, error) {
	appCtx.Logger.Info("Handling Projects request")

	// Получаем данные из базы данных
	var projects []model.Project
	if err := appCtx.DB.Preload("ProjectPhoto").Preload("ProjectReview").Find(&projects).Error; err != nil {
		appCtx.Logger.Error("Failed to fetch projects", zap.Error(err))
		return nil, err
	}

	appCtx.Logger.Info("Successfully fetched projects", zap.Int("count", len(projects)))
	return projects, nil
}

func GetProjectsByIDHandler(appCtx *context.AppContext, r *http.Request) (interface{}, error) {
	appCtx.Logger.Info("Handling Projects by id request")

	// Извлекаем параметр 'id' из URL
	id := chi.URLParam(r, "id")

	appCtx.Logger.Info("Handling Projects by id request", zap.String("id", id))
	if id == "" {
		appCtx.Logger.Warn("ID parameter is missing")
		return map[string]string{"error": "ID parameter is missing"}, nil
	}

	// Получаем данные из базы данных
	var project model.Project
	if err := appCtx.DB.Preload("ProjectPhoto").Preload("ProjectReview").Where("id = ?", id).Find(&project).Error; err != nil {
		appCtx.Logger.Error("Failed to fetch projects", zap.Error(err))
		return nil, err
	}

	appCtx.Logger.Info("Successfully fetched projects by id")
	return project, nil
}

// CreateProjectHandler обрабатывает создание нового проекта
func CreateProjectHandler(appCtx *context.AppContext, r *http.Request) (interface{}, error) {
	appCtx.Logger.Info("Handling Create Project request")

	var req CreateProjectRequest
	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		appCtx.Logger.Warn("Invalid request payload", zap.Error(err))
		return map[string]string{"error": "Invalid request payload"}, nil
	}

	// Валидация обязательных полей
	if req.Name == "" {
		appCtx.Logger.Warn("Missing required fields in request: Name")
		return map[string]string{"error": "Missing required field: name"}, nil
	}

	// Генерация UUID для проекта
	projectID := generateUUID()

	// Создание нового объекта Project
	newProject := model.Project{
		ID:          projectID,
		Name:        req.Name,
		Description: req.Description,
	}

	// Используем транзакцию для обеспечения атомарности операций
	tx := appCtx.DB.Begin()
	if tx.Error != nil {
		appCtx.Logger.Error("Failed to start transaction", zap.Error(tx.Error))
		return nil, tx.Error
	}

	// Сохранение проекта в базе данных
	if err := tx.Create(&newProject).Error; err != nil {
		tx.Rollback()
		appCtx.Logger.Error("Failed to create project", zap.Error(err))
		return nil, err
	}

	// Добавление фотографий к проекту
	for _, url := range req.PhotoURLs {
		photo := model.ProjectPhoto{
			RootID: projectID,
			URL:    url,
		}
		if err := tx.Create(&photo).Error; err != nil {
			tx.Rollback()
			appCtx.Logger.Error("Failed to create project photo", zap.Error(err))
			return nil, err
		}
	}

	// Добавление отзывов к проекту
	for _, reviewReq := range req.Reviews {
		// Валидация обязательных полей отзыва
		if reviewReq.FirstName == "" || reviewReq.LastName == "" || reviewReq.Comment == "" {
			tx.Rollback()
			appCtx.Logger.Warn("Missing required fields in review request")
			return map[string]string{"error": "Missing required fields in review"}, nil
		}

		// Создание отзыва
		review := model.ProjectReview{
			RootID:    projectID,
			FirstName: reviewReq.FirstName,
			LastName:  reviewReq.LastName,
			Comment:   reviewReq.Comment,
			Photos:    joinPhotos(reviewReq.Photos),
		}
		if err := tx.Create(&review).Error; err != nil {
			tx.Rollback()
			appCtx.Logger.Error("Failed to create project review", zap.Error(err))
			return nil, err
		}
	}

	// Фиксация транзакции
	if err := tx.Commit().Error; err != nil {
		appCtx.Logger.Error("Failed to commit transaction", zap.Error(err))
		return nil, err
	}

	appCtx.Logger.Info("Successfully created new project", zap.String("id", newProject.ID))
	return map[string]string{
		"message": "Project created successfully",
		"id":      newProject.ID,
	}, nil
}

func joinPhotos(photos []string) string {
	return stringJoin(photos, ",")
}

func stringJoin(elems []string, sep string) string {
	result := ""
	for i, s := range elems {
		if i > 0 {
			result += sep
		}
		result += s
	}
	return result
}

func generateUUID() string {
	return uuid.New().String()
}
