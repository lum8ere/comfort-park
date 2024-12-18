package routes

import (
	"backed-api-v2/libs/1_domain_methods/handlers/buildings"
	"backed-api-v2/libs/1_domain_methods/handlers/services"
	"backed-api-v2/libs/1_domain_methods/run_processor"
	"backed-api-v2/libs/4_common/smart_context"
	"net/http"

	"github.com/go-chi/chi/v5"
)

func InitRoutes(sctx smart_context.ISmartContext, r *chi.Mux) {
	r.Get("/", func(w http.ResponseWriter, r *http.Request) {
		w.Write([]byte("Добро пожаловать на сайт строительной компании"))
	})

	r.Get("/buildings", run_processor.JSONResponseMiddleware(sctx, buildings.GetBuildingsHandler))
	r.Get("/buildings/{id}", run_processor.JSONResponseMiddleware(sctx, buildings.GetBuildingByIDHandler))

	r.Get("/services", run_processor.JSONResponseMiddleware(sctx, services.GetServicesHandler))
	r.Get("/services/{id}", run_processor.JSONResponseMiddleware(sctx, services.GetServiceByIDHandler))

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
