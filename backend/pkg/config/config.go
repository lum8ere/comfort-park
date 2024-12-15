package config

import (
	"fmt"
	"os"

	"github.com/joho/godotenv"
	"go.uber.org/zap"
)

type Config struct {
	ServerAddress   string
	DatabaseURL     string
	MinioEndpoint   string
	MinioAccessKey  string
	MinioSecretKey  string
	MinioBucketName string
	MinioUseSSL     bool
	AdminName       string
	AdminEmail      string
	AdminPassword   string
	JWTSecret       string
}

func LoadConfig() *Config {
	// Загрузка .env файла
	err := godotenv.Load()
	if err != nil {
		zap.L().Warn("Could not load .env file, falling back to environment variables", zap.Error(err))
	}

	cfg := &Config{
		ServerAddress: os.Getenv("BC_PORT"),
		DatabaseURL: fmt.Sprintf("host=%s port=%s user=%s password=%s dbname=%s sslmode=disable",
			os.Getenv("DB_HOST"), os.Getenv("DB_PORT"), os.Getenv("DB_USER"), os.Getenv("DB_PASSWORD"), os.Getenv("DB_NAME")),
	}

	cfg.MinioEndpoint = os.Getenv("MINIO_ENDPOINT")
	cfg.MinioAccessKey = os.Getenv("MINIO_ACCESS_KEY")
	cfg.MinioSecretKey = os.Getenv("MINIO_SECRET_KEY")
	cfg.MinioBucketName = os.Getenv("MINIO_BUCKET")
	cfg.AdminName = os.Getenv("ADMIN_NAME")
	cfg.AdminEmail = os.Getenv("ADMIN_EMAIL")
	cfg.AdminPassword = os.Getenv("ADMIN_PASSWORD")
	cfg.JWTSecret = os.Getenv("JWT_SECRET")

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
