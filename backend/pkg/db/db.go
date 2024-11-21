package db

import (
	"backed-api/pkg/config"

	"github.com/jinzhu/gorm"
	_ "github.com/jinzhu/gorm/dialects/postgres"
	"go.uber.org/zap"
)

func NewDatabase(cfg *config.Config, log *zap.Logger) (*gorm.DB, error) {
	db, err := gorm.Open("postgres", cfg.DatabaseURL)
	if err != nil {
		log.Error("Failed to connect to database", zap.Error(err))
		return nil, err
	}
	log.Info("Connected to the database")
	return db, nil
}
