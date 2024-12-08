package db

import (
	"backed-api/pkg/config"

	_ "github.com/jinzhu/gorm/dialects/postgres"
	"go.uber.org/zap"
	"gorm.io/driver/postgres"
	"gorm.io/gorm"
)

func NewDatabase(cfg *config.Config, log *zap.Logger) (*gorm.DB, error) {

	config := config.LoadConfig()

	log.Info("config.MinioEndpoint", zap.String("cfg.MinioEndpoint", cfg.MinioEndpoint))

	db, err := gorm.Open(postgres.Open(config.DatabaseURL), &gorm.Config{})
	if err != nil {
		log.Error("Failed to connect to database", zap.Error(err))
		return nil, err
	}
	log.Info("Connected to the database")
	return db, nil
}
