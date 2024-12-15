package smart_context

import (
	"gorm.io/gorm"
)

type IDbManager interface {
	GetGORM() *gorm.DB
	RunUnderConnection(f func(tx *gorm.DB) error) error
}

type WrapDbManagerForSqliteTests struct {
	db *gorm.DB
}

func (w *WrapDbManagerForSqliteTests) GetGORM() *gorm.DB {
	return w.db
}

func (w *WrapDbManagerForSqliteTests) RunUnderConnection(f func(tx *gorm.DB) error) error {
	return f(w.db)
}
