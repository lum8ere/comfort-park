package api

import (
	"backed-api/pkg/api/handlers"
	"backed-api/pkg/api/middlewares"
	"backed-api/pkg/context"
	"net/http"

	"github.com/go-chi/chi"
	"go.uber.org/zap"
	"gorm.io/gorm"
)

func InitRoutes(r *chi.Mux, db *gorm.DB, log *zap.Logger) {
	appCtx := &context.AppContext{
		DB:     db,
		Logger: log,
	}

	// Применение мидлварей
	r.Use(middlewares.LoggingMiddleware(appCtx))
	r.Use(middlewares.RecoveryMiddleware(log))

	// Инициализация маршрутов
	r.Get("/", func(w http.ResponseWriter, r *http.Request) {
		w.Write([]byte("Добро пожаловать на сайт строительной компании"))
	})

	r.Get("/buildings", middlewares.JSONResponseMiddleware(handlers.GetBuildingsHandler, appCtx))
	r.Get("/buildings/{id}", middlewares.JSONResponseMiddleware(handlers.GetBuildingByIDHandler, appCtx))
	r.Get("/services", middlewares.JSONResponseMiddleware(handlers.GetServiceHandler, appCtx))
}
