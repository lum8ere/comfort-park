package api

import (
	"github.com/jinzhu/gorm"
	"go.uber.org/zap"
)

type AppContext struct {
	DB     *gorm.DB
	Logger *zap.Logger
}
