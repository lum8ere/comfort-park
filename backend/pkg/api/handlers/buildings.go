package handlers

import (
	"backed-api/pkg/context"
	"backed-api/pkg/db/model"
	"encoding/json"
	"net/http"
	"time"

	"github.com/go-chi/chi"
	"go.uber.org/zap"
)

func GetBuildingsHandler(appCtx *context.AppContext, r *http.Request) (interface{}, error) {
	appCtx.Logger.Info("Handling Buildings request")

	// Получаем данные из базы данных
	var buildings []model.Building
	if err := appCtx.DB.Preload("Photos").Preload("DictsBuildingCategory").Preload("DictsMaterials").Find(&buildings).Error; err != nil {
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
			Material:  b.DictsMaterials.Name,
			Category:  b.DictsBuildingCategory.Name,
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
	if err := appCtx.DB.Preload("Photos").Preload("DictsBuildingCategory").Preload("DictsMaterials").Where("id = ?", id).Find(&building).Error; err != nil {
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
		Material:    building.DictsMaterials.Name,
		Category:    building.DictsBuildingCategory.Name,
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
	Name         string   `json:"name" validate:"required"`
	Size         string   `json:"size"`
	Floors       int32    `json:"floors"`
	Description  string   `json:"description"`
	Area         float64  `json:"area"`
	MaterialCode string   `json:"material_code"`
	CategoryCode string   `json:"category_code"`
	Price        int32    `json:"price"`
	PhotoURLs    []string `json:"photo_urls"`
}

func CreateBuildingHandler(appCtx *context.AppContext, r *http.Request) (interface{}, error) {
	appCtx.Logger.Info("Handling Create Building request")

	var req CreateBuildingRequest
	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		appCtx.Logger.Warn("Invalid request payload", zap.Error(err))
		return map[string]string{"error": "Invalid request payload"}, nil
	}

	// Создание нового объекта Building
	newBuilding := model.Building{
		Name:   req.Name,
		Photos: []model.Photo{},
	}

	if req.Size != "" {
		newBuilding.Size = req.Size
	}

	if req.Description != "" {
		newBuilding.Description = req.Description
	}

	if req.Area != 0 {
		newBuilding.Area = req.Area
	}

	if req.Price != 0 {
		newBuilding.Price = req.Price
	}

	if req.MaterialCode != "" {
		newBuilding.MaterialCode = req.MaterialCode
	}

	if req.CategoryCode != "" {
		newBuilding.CategoryCode = req.CategoryCode
	}

	// Добавление фотографий, если они есть
	for _, url := range req.PhotoURLs {
		photo := model.Photo{
			URL:        url,
			BuildingID: newBuilding.ID,
		}
		newBuilding.Photos = append(newBuilding.Photos, photo)
	}

	// Сохранение в базе данных
	if err := appCtx.DB.Save(&newBuilding).Error; err != nil {
		appCtx.Logger.Error("Failed to create building", zap.Error(err))
		return nil, err
	}

	appCtx.Logger.Info("Successfully created new building", zap.String("id", newBuilding.ID))
	return map[string]string{"message": "Building created successfully", "id": newBuilding.ID}, nil
}
