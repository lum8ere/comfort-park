package main

import (
	"backed-api/pkg/api"
	"backed-api/pkg/config"
	"backed-api/pkg/db"
	"backed-api/pkg/logger"
	"net/http"

	"github.com/go-chi/chi"
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

	r := chi.NewRouter()
	api.InitRoutes(r, database, log)

	log.Info("Starting server", zap.String("address", cfg.ServerAddress))
	if err := http.ListenAndServe(cfg.ServerAddress, r); err != nil {
		log.Fatal("Server failed", zap.Error(err))
	}
}
