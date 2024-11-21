package api

import (
	"backed-api/pkg/api/handlers"
	"backed-api/pkg/api/middlewares"
	"backed-api/pkg/context"
	"net/http"

	"github.com/go-chi/chi"
	"github.com/jinzhu/gorm"
	"go.uber.org/zap"
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

	r.Get("/catalog", middlewares.JSONResponseMiddleware(handlers.CatalogHandler, appCtx))
	// r.Get("/projects", middlewares.JSONResponseMiddleware(handlers.ProjectsHandler, appCtx))
	// r.Get("/about", middlewares.JSONResponseMiddleware(handlers.AboutHandler, appCtx))
	// r.Get("/services", middlewares.JSONResponseMiddleware(handlers.ServicesHandler, appCtx))
	// r.Get("/contacts", middlewares.JSONResponseMiddleware(handlers.ContactsHandler, appCtx))
}
