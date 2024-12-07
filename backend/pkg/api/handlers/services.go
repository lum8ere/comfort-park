package handlers

import (
	"backed-api/pkg/context"
	"backed-api/pkg/db/model"
	"net/http"

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
