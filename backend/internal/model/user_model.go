package model

type UserPlant struct {
	UserID   string `json:"user_id" gorm:"primaryKey"`
	PlantID  string `json:"plant_id"`
	GrowthID int    `json:"growth_id`
}

type User struct {
	UserID      string `gorm:"type:uuid;primaryKey" json:"user_id"`
	Username    string `json:"username"`
	ProfileImg  string `json:"profile_img"`
	Description string `json:"description"`
}
