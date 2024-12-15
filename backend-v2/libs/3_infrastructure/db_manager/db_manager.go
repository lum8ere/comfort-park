package db_manager

import (
	"backed-api/libs/4_common/smart_context"
	"errors"
	"os"

	"gorm.io/driver/postgres"
	"gorm.io/gorm"
)

type DbManager struct {
	db        *gorm.DB
	jwtSecret string
}

func NewDbManager(sctx smart_context.ISmartContext) (*DbManager, error) {
	databaseUrl, ok := os.LookupEnv("DATABASE_URL")
	if !ok {
		return nil, errors.New("DATABASE_URL is not set")
	}
	sctx.Infof("DATABASE_URL: %s", databaseUrl)

	if sctx == nil {
		sctx = smart_context.NewSmartContext()
	}

	jwtSecret, ok := os.LookupEnv("JWT_SECRET")
	if !ok {
		return nil, errors.New("JWT_SECRET is not set")
	}
	sctx.Debugf("JWT_SECRET is set")

	db, err := gorm.Open(
		postgres.Open(databaseUrl),
		&gorm.Config{},
	)
	if err != nil {
		return nil, err
	}

	result := &DbManager{
		db:        db,
		jwtSecret: jwtSecret,
	}

	return result, nil
}

func (dbmanager *DbManager) GetGORM() *gorm.DB {
	return dbmanager.db.Session(&gorm.Session{NewDB: true})
}

func (dbmanager *DbManager) RunUnderConnection(f func(tx *gorm.DB) error) error {
	return dbmanager.db.Connection(f)
}

func (dbmanager *DbManager) GetJwtSecret() string {
	return dbmanager.jwtSecret
}
