package api

import (
	"backed-api/libs/4_common/smart_context"
	"net/http"

	"github.com/go-chi/chi"
)

func InitRoutes(sctx smart_context.ISmartContext, r *chi.Mux) {
	// Применение мидлварей

	// Инициализация маршрутов
	r.Get("/", func(w http.ResponseWriter, r *http.Request) {
		w.Write([]byte("Добро пожаловать на сайт строительной компании"))
	})

	r.Get("/test", func(w http.ResponseWriter, r *http.Request) {
		w.Write([]byte("test"))
		panic("test")
	})

	// r.Get("/buildings", middlewares.JSONResponseMiddleware(handlers.GetBuildingsHandler, appCtx))
	// r.Get("/buildings/{id}", middlewares.JSONResponseMiddleware(handlers.GetBuildingByIDHandler, appCtx))

	// r.Get("/services", middlewares.JSONResponseMiddleware(handlers.GetServiceHandler, appCtx))
	// r.Get("/services/{id}", middlewares.JSONResponseMiddleware(handlers.GetServiceByIDHandler, appCtx))

	// r.Get("/projects", middlewares.JSONResponseMiddleware(handlers.GetProjectsHandler, appCtx))
	// r.Get("/projects/{id}", middlewares.JSONResponseMiddleware(handlers.GetProjectsByIDHandler, appCtx))

	// r.Route("/api/auth", func(r chi.Router) {
	// 	r.Post("/login", middlewares.JSONResponseMiddleware(handlers.HandleLogin, appCtx))
	// })

	// // Защищенные маршруты
	// r.Group(func(r chi.Router) {
	// 	r.Use(middlewares.JWTMiddleware(appCtx)) // Применяем JWT middleware

	// 	r.Post("/prod/buildings", middlewares.JSONResponseMiddleware(handlers.CreateBuildingHandler, appCtx))
	// 	r.Put("/prod/buildings/{id}", middlewares.JSONResponseMiddleware(handlers.UpdateBuildingHandler, appCtx))
	// 	r.Delete("/prod/buildings/{id}", middlewares.JSONResponseMiddleware(handlers.DeleteBuildingHandler, appCtx))

	// 	r.Post("/prod/projects", middlewares.JSONResponseMiddleware(handlers.CreateProjectHandler, appCtx))
	// 	r.Put("/prod/services/{id}", middlewares.JSONResponseMiddleware(handlers.UpdateServiceHandler, appCtx))
	// 	r.Delete("/prod/services/{id}", middlewares.JSONResponseMiddleware(handlers.DeleteServiceHandler, appCtx))

	// 	r.Post("/prod/services", middlewares.JSONResponseMiddleware(handlers.CreateServiceHandler, appCtx))
	// 	r.Put("/prod/projects/{id}", middlewares.JSONResponseMiddleware(handlers.UpdateProjectHandler, appCtx))
	// 	r.Delete("/prod/projects/{id}", middlewares.JSONResponseMiddleware(handlers.DeleteProjectHandler, appCtx))

	// 	r.Post("/prod/upload", middlewares.JSONResponseMiddleware(handlers.UploadPhotoHandler, appCtx))
	// })

}
