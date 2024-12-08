package handlers

import (
	"backed-api/pkg/context"
	"backed-api/pkg/db/model"
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

	appCtx.Logger.Info("buildings", zap.Any("buildings", buildings))

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
	appCtx.Logger.Info("Handling Buildings request")

	// Извлекаем параметр 'id' из URL
	id := chi.URLParam(r, "id")
	if id == "" {
		appCtx.Logger.Warn("ID parameter is missing")
		return map[string]string{"error": "ID parameter is missing"}, nil
	}

	// Получаем данные из базы данных
	var buildings []model.Building
	if err := appCtx.DB.Where("id = ?", id).Find(&buildings).Error; err != nil {
		appCtx.Logger.Error("Failed to fetch buildings", zap.Error(err))
		return nil, err
	}

	appCtx.Logger.Info("Successfully fetched buildings", zap.Int("count", len(buildings)))
	return buildings, nil
}
