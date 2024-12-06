package context

import (
	"go.uber.org/zap"
	"gorm.io/gorm"
)

// AppContext хранит общие ресурсы приложения
type AppContext struct {
	DB     *gorm.DB
	Logger *zap.Logger
}
