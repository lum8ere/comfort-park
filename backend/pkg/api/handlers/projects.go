package handlers

import (
	"backed-api/pkg/context"
	"backed-api/pkg/db/model"
	"backed-api/pkg/db/storage"
	"encoding/json"
	"fmt"
	"net/http"
	"time"

	"github.com/go-chi/chi"
	"github.com/google/uuid"
	"go.uber.org/zap"
	"gorm.io/gorm"
)

// CreateProjectReviewRequest определяет структуру запроса для создания отзыва к проекту
type CreateProjectReviewForm struct {
	FirstName string `json:"first_name" validate:"required"`
	LastName  string `json:"last_name" validate:"required"`
	Comment   string `json:"comment" validate:"required"`
}

// CreateProjectRequest определяет структуру запроса для создания проекта
type CreateProjectRequest struct {
	Name        string                    `json:"name"`
	Description string                    `json:"description"`
	Reviews     []CreateProjectReviewForm `json:"reviews"`
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

	// Ограничение размера загружаемых файлов (например, 20MB)
	const maxUploadSize = 20 << 20 // 20 MB
	if err := r.ParseMultipartForm(maxUploadSize); err != nil {
		appCtx.Logger.Warn("Ошибка парсинга формы", zap.Error(err))
		return map[string]string{"error": "Invalid form data"}, nil
	}

	// Извлечение полей формы
	name := r.FormValue("name")
	if name == "" {
		return map[string]string{"error": "Missing required field: name"}, nil
	}

	description := r.FormValue("description")

	// Генерация UUID для проекта
	projectID := generateUUID()

	// Создание нового объекта Project
	newProject := model.Project{
		ID:          projectID,
		Name:        name,
		Description: description,
	}

	// Начало транзакции
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

	// Обработка загружаемых фотографий проекта
	projectPhotos, err := handleProjectPhotos(appCtx, r, projectID)
	if err != nil {
		tx.Rollback()
		return nil, err
	}

	// Обработка отзывов
	reviews, err := handleProjectReviews(appCtx, r, tx, projectID)
	if err != nil {
		tx.Rollback()
		return nil, err
	}

	// Добавление фотографий к проекту (если есть)
	if len(projectPhotos) > 0 {
		newProject.ProjectPhoto = projectPhotos
		if err := tx.Save(&newProject).Error; err != nil {
			tx.Rollback()
			appCtx.Logger.Error("Failed to save project photos", zap.Error(err))
			return nil, fmt.Errorf("failed to save project photos")
		}
	}

	// Добавление отзывов к проекту (если есть)
	if len(reviews) > 0 {
		newProject.ProjectReview = reviews
		if err := tx.Save(&newProject).Error; err != nil {
			tx.Rollback()
			appCtx.Logger.Error("Failed to save project reviews", zap.Error(err))
			return nil, fmt.Errorf("failed to save project reviews")
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

// handleProjectPhotos обрабатывает загрузку фотографий проекта
func handleProjectPhotos(appCtx *context.AppContext, r *http.Request, projectID string) ([]model.ProjectPhoto, error) {
	var projectPhotos []model.ProjectPhoto

	// Извлечение файлов из формы с ключом "photos"
	files := r.MultipartForm.File["photos"]
	if len(files) > 0 {
		for _, fileHeader := range files {
			file, err := fileHeader.Open()
			if err != nil {
				appCtx.Logger.Warn("Ошибка открытия файла проекта", zap.Error(err))
				continue // Пропускаем файл и продолжаем обработку остальных
			}
			defer file.Close()

			// Генерация уникального имени файла
			objectName := uuid.New().String() + "_" + fileHeader.Filename

			// Загрузка файла в MinIO
			bucketName := "park-comfort" // Замените на ваше название бакета
			fileURL, err := storage.UploadFile(bucketName, objectName, file, fileHeader.Size)
			if err != nil {
				appCtx.Logger.Error("Ошибка загрузки файла проекта в бакет", zap.Error(err))
				continue // Пропускаем файл и продолжаем обработку остальных
			}

			// Создание записи ProjectPhoto
			photo := model.ProjectPhoto{
				ID:        uuid.New().String(),
				RootID:    projectID,
				URL:       fileURL,
				CreatedAt: time.Now(),
			}

			// Добавление фотографии к списку
			projectPhotos = append(projectPhotos, photo)
		}
	}

	return projectPhotos, nil
}

// handleProjectReviews обрабатывает создание и загрузку фотографий для отзывов
func handleProjectReviews(appCtx *context.AppContext, r *http.Request, tx *gorm.DB, projectID string) ([]model.ProjectReview, error) {
	var reviews []model.ProjectReview

	// Извлечение данных отзывов из формы
	// Ожидаем, что отзывы передаются как JSON строка под ключом "reviews"
	reviewsJSON := r.FormValue("reviews")
	if reviewsJSON == "" {
		// Нет отзывов
		return reviews, nil
	}

	var reviewRequests []CreateProjectReviewForm
	if err := json.Unmarshal([]byte(reviewsJSON), &reviewRequests); err != nil {
		appCtx.Logger.Warn("Неверный формат отзывов", zap.Error(err))
		return nil, fmt.Errorf("invalid reviews format")
	}

	// Извлечение файлов отзывов из формы
	// Предполагается, что файлы отзывов передаются под ключами "review_photos_0", "review_photos_1" и т.д.
	for idx, reviewReq := range reviewRequests {
		// Валидация обязательных полей отзыва
		if reviewReq.FirstName == "" || reviewReq.LastName == "" || reviewReq.Comment == "" {
			appCtx.Logger.Warn("Missing required fields in review request")
			return nil, fmt.Errorf("missing required fields in review")
		}

		// Создание отзыва
		review := model.ProjectReview{
			ID:        uuid.New().String(),
			RootID:    projectID,
			FirstName: reviewReq.FirstName,
			LastName:  reviewReq.LastName,
			Comment:   reviewReq.Comment,
			Photos:    "", // Будем заполнять после загрузки фотографий
			CreatedAt: time.Now(),
		}

		// Обработка фотографий отзыва
		// Извлекаем файлы под ключом "review_photos_<idx>"
		reviewPhotosKey := fmt.Sprintf("review_photos_%d", idx)
		reviewFiles := r.MultipartForm.File[reviewPhotosKey]
		var photoURLs []string

		if len(reviewFiles) > 0 {
			for _, fileHeader := range reviewFiles {
				file, err := fileHeader.Open()
				if err != nil {
					appCtx.Logger.Warn("Ошибка открытия файла отзыва", zap.Error(err))
					continue // Пропускаем файл и продолжаем обработку остальных
				}
				defer file.Close()

				// Генерация уникального имени файла
				objectName := uuid.New().String() + "_" + fileHeader.Filename

				// Загрузка файла в MinIO
				bucketName := "park-comfort" // Замените на ваше название бакета
				fileURL, err := storage.UploadFile(bucketName, objectName, file, fileHeader.Size)
				if err != nil {
					appCtx.Logger.Error("Ошибка загрузки файла отзыва в бакет", zap.Error(err))
					continue // Пропускаем файл и продолжаем обработку остальных
				}

				// Добавление URL к списку
				photoURLs = append(photoURLs, fileURL)
			}
		}

		// Объединение URL фотографий в строку
		review.Photos = joinPhotos(photoURLs)

		// Сохранение отзыва в базе данных
		if err := tx.Create(&review).Error; err != nil {
			appCtx.Logger.Error("Failed to create project review", zap.Error(err))
			return nil, fmt.Errorf("failed to create project review")
		}

		// Добавление отзыва к списку
		reviews = append(reviews, review)
	}

	return reviews, nil
}

func joinPhotos(photos []string) string {
	return "{" + stringJoin(photos, ",") + "}"
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
