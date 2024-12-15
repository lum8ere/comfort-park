package context

import (
	"backed-api/pkg/config"
	"context"

	"go.uber.org/zap"
	"gorm.io/gorm"
)

// AppContext хранит общие ресурсы приложения
type AppContext struct {
	DB     *gorm.DB
	Config *config.Config
	Logger *zap.Logger
	ctx    context.Context
}

// Конструктор для создания нового AppContext с базовым контекстом
func NewAppContext(db *gorm.DB, config *config.Config, logger *zap.Logger) *AppContext {
	return &AppContext{
		DB:     db,
		Config: config,
		Logger: logger,
		ctx:    context.Background(),
	}
}

func (a *AppContext) WithValue(key, value interface{}) *AppContext {
	newCtx := context.WithValue(a.ctx, key, value)
	return &AppContext{
		DB:     a.DB,
		Config: a.Config,
		Logger: a.Logger,
		ctx:    newCtx,
	}
}

// Value возвращает значение из контекста по ключу
func (a *AppContext) Value(key interface{}) interface{} {
	return a.ctx.Value(key)
}

// Context возвращает текущий context.Context
func (a *AppContext) Context() context.Context {
	return a.ctx
}
