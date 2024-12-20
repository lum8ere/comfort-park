package buildings

import (
	"backed-api-v2/libs/2_generated_models/model"
	"backed-api-v2/libs/4_common/smart_context"
	"fmt"
	"mime/multipart"

	"github.com/google/uuid"
)

func UpdateBuildingHandler(sctx smart_context.ISmartContext, data map[string]interface{}) (interface{}, error) {
	// Получаем id из параметров
	id, _ := data["id"].(string)
	if id == "" {
		return map[string]string{"error": "ID parameter is missing"}, nil
	}

	// Находим существующее здание
	var building model.Building
	if err := sctx.GetDB().Where("id = ?", id).Preload("Photos").First(&building).Error; err != nil {
		sctx.Warnf("Building not found: %v", err)
		return map[string]string{"error": "Building not found"}, nil
	}

	// Обновляем поля, если они есть
	if val, ok := data["name"].(string); ok && val != "" {
		building.Name = val
	}
	if val, ok := data["size"].(string); ok && val != "" {
		building.Size = val
	}
	if val, ok := data["floors"].(int); ok {
		building.Floors = int32(val)
	}
	if val, ok := data["area"].(float64); ok {
		building.Area = val
	}
	if val, ok := data["description"].(string); ok && val != "" {
		building.Description = val
	}
	if val, ok := data["price"].(int); ok {
		building.Price = int32(val)
	}
	if val, ok := data["is_active"].(string); ok && val != "" {
		building.IsActive = (val == "true")
	}

	// Обновим существующую запись в БД
	if err := sctx.GetDB().Save(&building).Error; err != nil {
		sctx.Errorf("Failed to update building: %v", err)
		return nil, fmt.Errorf("failed to update building")
	}

	// Если есть новые файлы, добавим их тоже
	var files []*multipart.FileHeader
	if fVal, ok := data["files"]; ok {
		if fHeaders, ok := fVal.([]*multipart.FileHeader); ok {
			files = fHeaders
		}
	}

	if len(files) > 0 {
		for _, fileHeader := range files {
			file, err := fileHeader.Open()
			if err != nil {
				sctx.Warnf("Ошибка открытия файла: %v", err)
				continue
			}
			defer file.Close()

			objectName := uuid.New().String() + "_" + fileHeader.Filename
			bucketName := "park-comfort"
			fileURL, err := sctx.GetMinioManager().UploadFile(sctx, bucketName, objectName, file, fileHeader.Size)
			if err != nil {
				sctx.Errorf("Ошибка загрузки файла: %v", err)
				continue
			}

			photo := model.Photo{
				URL:        fileURL,
				BuildingID: building.ID,
				IsGallery:  false,
			}

			building.Photos = append(building.Photos, photo)
		}

		// Сохраняем изменения (новые фото)
		if err := sctx.GetDB().Save(&building).Error; err != nil {
			sctx.Errorf("Failed to save building photos: %v", err)
			return nil, fmt.Errorf("failed to save building photos")
		}
	}

	return map[string]string{"message": "Building updated successfully"}, nil
}
