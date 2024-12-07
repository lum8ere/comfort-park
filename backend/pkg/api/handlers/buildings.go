package handlers

import (
	"backed-api/pkg/context"
	"backed-api/pkg/db/model"
	"net/http"

	"github.com/go-chi/chi"
	"go.uber.org/zap"
)

func GetBuildingsHandler(appCtx *context.AppContext, r *http.Request) (interface{}, error) {
	appCtx.Logger.Info("Handling Buildings request")

	// Получаем данные из базы данных
	var buildings []model.Building
	if err := appCtx.DB.Find(&buildings).Error; err != nil {
		appCtx.Logger.Error("Failed to fetch buildings", zap.Error(err))
		return nil, err
	}

	appCtx.Logger.Info("Successfully fetched buildings", zap.Int("count", len(buildings)))
	return buildings, nil
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
