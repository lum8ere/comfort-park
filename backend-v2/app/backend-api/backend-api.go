package main

import (
	"backed-api/libs/3_infrastructure/db_manager"
	"backed-api/libs/3_infrastructure/minio_manager"
	"backed-api/libs/4_common/env_vars"
	"backed-api/libs/4_common/smart_context"
	"backed-api/pkg/api"
	"backed-api/pkg/config"
	"net/http"
	"os"

	"github.com/go-chi/chi"
	chi_middleware "github.com/go-chi/chi/v5/middleware"
	"github.com/go-chi/cors"
	"go.uber.org/zap"
)

func main() {
	env_vars.LoadEnvVars() // load env vars from .env file if ENV_PATH is specified
	os.Setenv("LOG_LEVEL", "debug")

	logger := smart_context.NewSmartContext()

	cfg := config.LoadConfig()

	dbm, err := db_manager.NewDbManager(logger)
	if err != nil {
		logger.Fatalf("Error connecting to database: %v", err)
	}
	logger = logger.WithDbManager(dbm)

	minioManager, err := minio_manager.NewMinioManager()
	if err != nil {
		logger.Fatalf("Could not initialize MinioManager: %v", err)
	}

	logger = logger.WithMinioManager(minioManager)

	// db.SeedAdmin(database, *cfg, log)
	r := chi.NewRouter()

	r.Use(chi_middleware.Logger)

	r.Use(cors.Handler(cors.Options{
		AllowedOrigins:   []string{"https://*", "http://*"},
		AllowedMethods:   []string{"GET", "POST", "PUT", "DELETE", "OPTIONS", "HEAD"},
		AllowedHeaders:   []string{"Accept", "Authorization", "Content-Type", "X-CSRF-Token", "X-Requested-With", "X-Request-Id", "X-Session-Id", "Apikey", "X-Api-Key"},
		ExposedHeaders:   []string{"Link"},
		AllowCredentials: true,
		MaxAge:           300,
	}))

	api.InitRoutes(logger, r)

	logger.Info("Starting server", zap.String("address", cfg.ServerAddress))
	if err := http.ListenAndServe(cfg.ServerAddress, r); err != nil {
		logger.Fatal("Server failed", zap.Error(err))
	}
}
