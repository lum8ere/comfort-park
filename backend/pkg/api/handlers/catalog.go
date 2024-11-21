package handlers

import (
	"backed-api/pkg/context"
	"backed-api/pkg/db"
	"net/http"

	"go.uber.org/zap"
)

func CatalogHandler(appCtx *context.AppContext, r *http.Request) (interface{}, error) {
	appCtx.Logger.Info("Handling Catalog request")

	// Получаем данные из базы данных
	var projects []db.Project
	if err := appCtx.DB.Find(&projects).Error; err != nil {
		appCtx.Logger.Error("Failed to fetch projects", zap.Error(err))
		return nil, err
	}

	appCtx.Logger.Info("Successfully fetched projects", zap.Int("count", len(projects)))
	return projects, nil
}
