package buildings

import (
	"backed-api-v2/libs/2_generated_models/model"
	"backed-api-v2/libs/4_common/smart_context"
	"fmt"
	"mime/multipart"

	"github.com/google/uuid"
)

func CreateBuildingHandler(sctx smart_context.ISmartContext, data map[string]interface{}) (interface{}, error) {
	sctx.Info("Handling Create Building request")

	// Извлекаем данные из data
	// Если поля отсутствуют или имеют неверный тип - подставляйте значения по умолчанию или обрабатывайте ошибку
	name, _ := data["name"].(string)
	if name == "" {
		return map[string]string{"error": "Name is required"}, nil
	}

	size, _ := data["size"].(string)

	var floors int32
	if val, ok := data["floors"].(int); ok {
		floors = int32(val)
	}

	description, _ := data["description"].(string)

	var area float64
	if val, ok := data["area"].(float64); ok {
		area = val
	}

	var price int32
	if val, ok := data["price"].(int); ok {
		price = int32(val)
	}

	// Создаём новый объект Building
	newBuilding := model.Building{
		Name:        name,
		Size:        size,
		Description: description,
		Area:        area,
		Floors:      floors,
		Price:       price,
		Photos:      []model.Photo{},
	}

	db := sctx.GetDB() // Предполагается, что sctx может вернуть DB
	if err := db.Create(&newBuilding).Error; err != nil {
		sctx.Errorf("Failed to create building", err)
		return nil, fmt.Errorf("failed to create building")
	}

	// Обработка файлов
	var files []*multipart.FileHeader
	if val, ok := data["files"]; ok {
		if f, ok := val.([]*multipart.FileHeader); ok {
			files = f
		}
	}

	if len(files) > 0 {
		for _, fileHeader := range files {
			file, err := fileHeader.Open()
			if err != nil {
				sctx.Warn("Ошибка открытия файла", err)
				continue
			}
			defer file.Close()

			// Генерируем уникальное имя для файла
			objectName := uuid.New().String() + "_" + fileHeader.Filename
			bucketName := "park-comfort"

			// Загрузка файла в MinIO (или другое хранилище)
			fileURL, err := sctx.GetMinioManager().UploadFile(sctx, bucketName, objectName, file, fileHeader.Size)
			if err != nil {
				sctx.Error("Ошибка загрузки файла в бакет", err)
				continue
			}

			// Создание записи фотографии
			photo := model.Photo{
				URL:        fileURL,
				BuildingID: newBuilding.ID,
				IsGallery:  false,
			}

			newBuilding.Photos = append(newBuilding.Photos, photo)
		}

		if err := db.Save(&newBuilding).Error; err != nil {
			sctx.Error("Ошибка сохранения фотографий в базе данных", err)
			return nil, fmt.Errorf("failed to save photos")
		}
	}

	sctx.Info("Successfully created new building id: %v", newBuilding.ID)
	return map[string]string{"message": "Building created successfully", "id": newBuilding.ID}, nil
}
