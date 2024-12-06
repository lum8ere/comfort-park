package main

import (
	"backed-api/pkg/config"
	"backed-api/pkg/db"
	"backed-api/pkg/logger"

	"go.uber.org/zap"
	"gorm.io/gen"
)

// Dynamic SQL
type Querier interface {
	// SELECT * FROM @@table WHERE name = @name{{if role !=""}} AND role = @role{{end}}
	FilterWithNameAndRole(name, role string) ([]gen.T, error)
}

func main() {
	cfg := config.LoadConfig()

	log, err := logger.NewLogger()
	if err != nil {
		panic(err)
	}
	defer log.Sync()

	database, err := db.NewDatabase(cfg, log)
	if err != nil {
		log.Fatal("Failed to connect to database", zap.Error(err))
	}

	g := gen.NewGenerator(gen.Config{
		OutPath: "./pkg/db/models",
		Mode:    gen.WithoutContext | gen.WithDefaultQuery | gen.WithQueryInterface, // generate mode
	})

	g.UseDB(database) // теперь database имеет тип *gorm.io/gorm.DB

	g.ApplyBasic(
		g.GenerateAllTable()...,
	)

	g.Execute()
}
