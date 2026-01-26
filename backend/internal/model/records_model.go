package model

import "time"

type Records struct {
	ID          int       `gorm:"primaryKey;column:id" json:"id"`
	UserID      string    `gorm:"column:user_id" json:"user_id"`
	UserPlantID int       `gorm:"column:user_plant_id" json:"plant_id"`
	Title       string    `gorm:"column:title" json:"title"`
	Content     string    `gorm:"column:content" json:"content"`
	ImageURL    string    `gorm:"column:image_path" json:"image_url"`
	CreatedAt   time.Time `gorm:"column:created_at" json:"created_at"`
}
