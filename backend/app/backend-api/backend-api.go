package main

import (
	"backed-api/pkg/api"
	"backed-api/pkg/config"
	"backed-api/pkg/db"
	"backed-api/pkg/db/storage"
	"backed-api/pkg/logger"
	"net/http"

	"github.com/go-chi/chi"
	"github.com/go-chi/cors"
	"go.uber.org/zap"
)

func main() {
	cfg := config.LoadConfig()

	// Инициализация логгера
	log, err := logger.NewLogger()
	if err != nil {
		panic(err)
	}
	defer log.Sync()

	// Инициализация базы данных
	database, err := db.NewDatabase(cfg, log)
	if err != nil {
		log.Fatal("Failed to connect to database", zap.Error(err))
	}

	storage.InitMinio(cfg.MinioEndpoint, cfg.MinioAccessKey, cfg.MinioSecretKey, false)

	r := chi.NewRouter()

	r.Use(cors.Handler(cors.Options{
		AllowedOrigins:   []string{"https://*", "http://*"},
		AllowedMethods:   []string{"GET", "POST", "PUT", "DELETE", "OPTIONS", "HEAD"},
		AllowedHeaders:   []string{"Accept", "Authorization", "Content-Type", "X-CSRF-Token", "X-Requested-With", "X-Request-Id", "X-Session-Id", "Apikey", "X-Api-Key"},
		ExposedHeaders:   []string{"Link"},
		AllowCredentials: true,
		MaxAge:           300,
	}))

	api.InitRoutes(r, database, log)

	log.Info("Starting server", zap.String("address", cfg.ServerAddress))
	if err := http.ListenAndServe(cfg.ServerAddress, r); err != nil {
		log.Fatal("Server failed", zap.Error(err))
	}
}
