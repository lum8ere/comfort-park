package config

import (
	"os"

	"go.uber.org/zap"
)

type Config struct {
	ServerAddress string
	DatabaseURL   string
}

func LoadConfig() *Config {
	cfg := &Config{
		ServerAddress: os.Getenv("SERVER_ADDRESS"),
		DatabaseURL:   os.Getenv("DATABASE_URL"),
	}

	if cfg.ServerAddress == "" {
		cfg.ServerAddress = ":9000" // Значение по умолчанию
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
