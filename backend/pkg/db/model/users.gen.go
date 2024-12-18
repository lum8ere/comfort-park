// Code generated by gorm.io/gen. DO NOT EDIT.
// Code generated by gorm.io/gen. DO NOT EDIT.
// Code generated by gorm.io/gen. DO NOT EDIT.

package model

import (
	"time"
)

const TableNameUser = "users"

// User mapped from table <users>
type User struct {
	ID        string    `gorm:"column:id;primaryKey;default:gen_random_uuid()" json:"id"`
	Name      string    `gorm:"column:name" json:"name"`
	Email     string    `gorm:"column:email;not null" json:"email"`
	Password  string    `gorm:"column:password;not null" json:"password"`
	Role      string    `gorm:"column:role" json:"role"`
	CreatedAt time.Time `gorm:"column:created_at;default:now()" json:"created_at"`
}

// TableName User's table name
func (*User) TableName() string {
	return TableNameUser
}
