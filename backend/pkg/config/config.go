package config

import (
	"fmt"
	"os"

	"go.uber.org/zap"
)

type Config struct {
	ServerAddress string
	DatabaseURL   string
}

func LoadConfig() *Config {
	cfg := &Config{
		ServerAddress: os.Getenv("BC_PORT"),
		// DatabaseURL: fmt.Sprintf("host=%s port=%s user=%s password=%s dbname=%s sslmode=disable",
		// 	os.Getenv("DB_HOST"), os.Getenv("DB_PORT"), os.Getenv("DB_USER"), os.Getenv("DB_PASSWORD"), os.Getenv("DB_NAME")),
		DatabaseURL: fmt.Sprintf("host=localhost port=5432 user=postgres password=root dbname=postgres sslmode=disable"),
	}

	if cfg.ServerAddress == "" {
		cfg.ServerAddress = ":4000" // Значение по умолчанию
	}

	if cfg.DatabaseURL == "" {
		zap.L().Fatal("DATABASE_URL is not set")
	}

	zap.L().Info("Configuration loaded",
		zap.String("ServerAddress", cfg.ServerAddress),
		// Не логируем DatabaseURL по соображениям безопасности
	)

	return cfg
}
