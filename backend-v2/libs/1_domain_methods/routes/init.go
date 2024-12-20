package routes

import (
	"backed-api-v2/libs/1_domain_methods/handlers/auth"
	"backed-api-v2/libs/1_domain_methods/handlers/buildings"
	"backed-api-v2/libs/1_domain_methods/handlers/projects"
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

	r.Get("/projects", run_processor.JSONResponseMiddleware(sctx, projects.GetProjectsHandler))
	r.Get("/projects/{id}", run_processor.JSONResponseMiddleware(sctx, projects.GetProjectsByIDHandler))

	r.Route("/api/auth", func(r chi.Router) {
		r.Post("/login", run_processor.JSONResponseMiddleware(sctx, auth.HandleLogin))
		r.Get("/token", run_processor.JSONResponseMiddleware(sctx, auth.CheckTokenHandler))
	})

	// Защищенные маршруты
	r.Group(func(r chi.Router) {
		r.Use(auth.JWTMiddleware(sctx))

		r.Post("/prod/buildings", run_processor.JSONResponseMiddleware(sctx, buildings.CreateBuildingHandler))
		r.Put("/prod/buildings/{id}", run_processor.JSONResponseMiddleware(sctx, buildings.UpdateBuildingHandler))
		r.Delete("/prod/buildings/{id}", run_processor.JSONResponseMiddleware(sctx, buildings.DeleteBuildingHandler))

		// r.Post("/prod/projects", middlewares.JSONResponseMiddleware(handlers.CreateProjectHandler, appCtx))
		// r.Put("/prod/services/{id}", middlewares.JSONResponseMiddleware(handlers.UpdateServiceHandler, appCtx))
		// r.Delete("/prod/services/{id}", middlewares.JSONResponseMiddleware(handlers.DeleteServiceHandler, appCtx))

		// r.Post("/prod/services", middlewares.JSONResponseMiddleware(handlers.CreateServiceHandler, appCtx))
		// r.Put("/prod/projects/{id}", middlewares.JSONResponseMiddleware(handlers.UpdateProjectHandler, appCtx))
		// r.Delete("/prod/projects/{id}", middlewares.JSONResponseMiddleware(handlers.DeleteProjectHandler, appCtx))
	})
}
