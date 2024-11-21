package db

import "github.com/jinzhu/gorm"

// Определение моделей для GORM

type Project struct {
	gorm.Model
	Name        string
	Description string
	ImageURL    string
	// Добавьте другие поля по необходимости
}

type Service struct {
	gorm.Model
	Name        string
	Description string
	Price       float64
	// Добавьте другие поля по необходимости
}
