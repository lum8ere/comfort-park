package db

// import (
// 	"backed-api/pkg/config"
// 	"backed-api/pkg/db/model"

// 	"go.uber.org/zap"
// 	"golang.org/x/crypto/bcrypt"
// 	"gorm.io/gorm"
// )

// func SeedAdmin(database *gorm.DB, cfg config.Config, log *zap.Logger) {
// 	var count int64
// 	database.Model(&model.User{}).Count(&count)
// 	if count == 0 {
// 		passwordHash, err := bcrypt.GenerateFromPassword([]byte(cfg.AdminPassword), bcrypt.DefaultCost)
// 		if err != nil {
// 			log.Fatal("Failed to hash admin password", zap.Error(err))
// 		}

// 		admin := model.User{
// 			Name:     cfg.AdminName,
// 			Email:    cfg.AdminEmail,
// 			Password: string(passwordHash),
// 			Role:     "admin",
// 		}

// 		if err := database.Create(&admin).Error; err != nil {
// 			log.Fatal("Failed to create admin user", zap.Error(err))
// 		}

// 		log.Info("Admin user created", zap.String("email", admin.Email))
// 	} else {
// 		log.Info("Admin user already exists")
// 	}
// }
