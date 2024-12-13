package handlers

import (
	"backed-api/pkg/context"
	"backed-api/pkg/db/model"
	"net/http"

	"github.com/go-chi/chi"
	"go.uber.org/zap"
)

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
