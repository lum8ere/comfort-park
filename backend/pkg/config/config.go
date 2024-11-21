package config

import (
	"go.uber.org/zap"
)

type Config struct {
	ServerAddress string
	DatabaseURL   string
}

func LoadConfig() *Config {
	// cfg := &Config{
	// 	ServerAddress: os.Getenv("SERVER_ADDRESS"),
	// 	DatabaseURL:   os.Getenv("DATABASE_URL"),
	// }
	// временный вариант
	cfg := &Config{
		ServerAddress: ":9000",
		DatabaseURL:   "postgres://your_user:yourpassword@localhost:5432/your_database?sslmode=disable",
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
