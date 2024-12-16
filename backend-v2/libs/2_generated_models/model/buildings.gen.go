// Code generated by gorm.io/gen. DO NOT EDIT.
// Code generated by gorm.io/gen. DO NOT EDIT.
// Code generated by gorm.io/gen. DO NOT EDIT.

package model

import (
	"time"
)

const TableNameBuilding = "buildings"

// Building mapped from table <buildings>
type Building struct {
	ID           string    `gorm:"column:id;primaryKey;default:gen_random_uuid()" json:"id"`
	CategoryCode string    `gorm:"column:category_code" json:"category_code"`
	MaterialCode string    `gorm:"column:material_code" json:"material_code"`
	Name         string    `gorm:"column:name" json:"name"`
	Size         string    `gorm:"column:size" json:"size"`
	Floors       int32     `gorm:"column:floors;not null;default:1" json:"floors"`
	Area         float64   `gorm:"column:area" json:"area"`
	Description  string    `gorm:"column:description" json:"description"`
	Bange        string    `gorm:"column:bange" json:"bange"`
	Price        int32     `gorm:"column:price" json:"price"`
	CreatedAt    time.Time `gorm:"column:created_at;default:now()" json:"created_at"`
	IsActive     bool      `gorm:"column:is_active;not null;default:true" json:"is_active"`

	// Ручные ассоциации buildings
	Photos        []Photo                		`gorm:"foreignKey:BuildingID"`
}

// TableName Building's table name
func (*Building) TableName() string {
	return TableNameBuilding
}
