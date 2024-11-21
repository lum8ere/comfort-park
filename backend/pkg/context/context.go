package context

import (
	"github.com/jinzhu/gorm"
	"go.uber.org/zap"
)

// AppContext хранит общие ресурсы приложения
type AppContext struct {
	DB     *gorm.DB
	Logger *zap.Logger
}
