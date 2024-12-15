package handlers

import (
	"backed-api/pkg/context"
	"backed-api/pkg/db/model"
	"backed-api/pkg/db/storage"
	"fmt"
	"net/http"
	"strconv"

	"github.com/google/uuid"
	"go.uber.org/zap"
)

func UploadPhotoHandler(appCtx *context.AppContext, r *http.Request) (interface{}, error) {
	// Ограничение размера загружаемого файла (например, 10MB)
	r.ParseMultipartForm(10 << 20) // 10 MB

	// Извлечение файла из формы
	file, header, err := r.FormFile("file")
	if err != nil {
		appCtx.Logger.Error("Ошибка получения файла из формы", zap.Error(err))
		return nil, fmt.Errorf("invalid file")
	}
	defer file.Close()

	// Генерация уникального имени файла
	objectName := uuid.New().String() + "_" + header.Filename

	// Загрузка файла в MinIO
	bucketName := "park-comfort" // Замените на ваше название бакета
	fileURL, err := storage.UploadFile(bucketName, objectName, file, header.Size)
	if err != nil {
		appCtx.Logger.Error("Ошибка загрузки файла в бакет", zap.Error(err))
		return nil, fmt.Errorf("failed to upload file")
	}

	// Получение дополнительных данных из формы (например, building_id и is_gallery)
	buildingIDStr := r.FormValue("building_id")
	var buildingID *string
	if buildingIDStr != "" {
		buildingID = &buildingIDStr
	}

	isGallery := false
	isGalleryStr := r.FormValue("is_gallery")
	if isGalleryStr != "" {
		isGallery, err = strconv.ParseBool(isGalleryStr)
		if err != nil {
			appCtx.Logger.Warn("Неверный формат is_gallery, устанавливаю false", zap.Error(err))
		}
	}

	// Создание записи в базе данных
	photo := model.Photo{
		URL:        fileURL,
		BuildingID: *buildingID,
		IsGallery:  isGallery,
	}

	if err := appCtx.DB.Save(&photo).Error; err != nil {
		appCtx.Logger.Error("Ошибка создания записи в базе данных", zap.Error(err))
		return nil, fmt.Errorf("failed to save photo record")
	}

	return photo, nil
}
