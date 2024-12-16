// Code generated by gorm.io/gen. DO NOT EDIT.
// Code generated by gorm.io/gen. DO NOT EDIT.
// Code generated by gorm.io/gen. DO NOT EDIT.

package model

import (
	"time"
)

const TableNamePhoto = "photos"

// Photo mapped from table <photos>
type Photo struct {
	ID         string    `gorm:"column:id;primaryKey;default:gen_random_uuid()" json:"id"`
	URL        string    `gorm:"column:url;not null" json:"url"`
	BuildingID string    `gorm:"column:building_id" json:"building_id"`
	IsGallery  bool      `gorm:"column:is_gallery;not null" json:"is_gallery"`
	CreatedAt  time.Time `gorm:"column:created_at;default:now()" json:"created_at"`
}

// TableName Photo's table name
func (*Photo) TableName() string {
	return TableNamePhoto
}