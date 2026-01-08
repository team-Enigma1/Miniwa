package model


type Todos struct {
	Id            int  `gorm:"primaryKey;column:id" json:"id"`
	User_plant_id int  `gorm:"column:user_plant_id" json:"user_plant_id"`
	Water         bool `gorm:"column:water" json:"water"`
	Water_count   int8 `gorm:"column:water_count" json:"water_count"`
	Fertilizer    bool `gorm:"column:fertilizer" json:"fertilizer"`
}

type UpdateUserTodo struct {
	User_plant_id int   `json:"user_plant_id"`
	Water_count   *int8 `json:"water_count"`
	Fertilizer    *bool `json:"fertilizer"`
}