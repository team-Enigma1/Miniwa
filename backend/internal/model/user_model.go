package model

type UserPlant struct {
	ID      int64  `json:"id" gorm:"primaryKey;autoIncrement"`
	UserID  string `json:"user_id" gorm:"type:uuid"`
	PlantID int64  `json:"plant_id"`
}

type User struct {
	UserID      string `gorm:"type:uuid;primaryKey" json:"user_id"`
	Username    string `json:"username"`
	ProfileImg  string `json:"profile_img"`
	Description string `json:"description"`
}
