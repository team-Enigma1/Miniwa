package model

import "time"

type Plant struct {
	PlantID        int    `gorm:"column:plant_id;primaryKey" json:"plant_id"`
	Pname          string `gorm:"column:pname" json:"name"`
	SoilID         int    `gorm:"column:soil_id" json:"soil_id"`
	Description    string `gorm:"column:description" json:"description"`
	ImageURL       string `gorm:"column:image_url" json:"image_url"`
	WateringSched  int8   `gorm:"column:watering_sched" json:"watering_sched"`
	Sunlight       string `gorm:"column:sunlight" json:"sunlight"`
	GrowthDuration int    `gorm:"column:growth_duration" json:"growth_duration"`
	Season         string `gorm:"column:season" json:"season"`
}

type UserPlants struct {
	ID             int       `gorm:"column:id;primaryKey" json:"id"`
	UserPlantID    int       `gorm:"column:user_plant_id" json:"userPlantId"`
	UserID         string    `json:"user_id"`
	Name           string    `json:"name"`
	Img            string    `json:"img"`
	GrowthDuration int       `json:"growthDuration"`
	WateringSched  string    `json:"wateringSched"`
	Sunlight       string    `json:"sunlight"`
	PlantedAt      time.Time `json:"plantedAt"`
	HarvestAt      time.Time `json:"harvestAt"`
}

type HarvestedPlant struct {
	HarvestedPlantID int       `gorm:"column:id;primaryKey" json:"id"`
	UserID           string    `gorm:"column:user_id" json:"user_id"`
	Pname            string    `gorm:"column:pname" json:"pname"`
	ImageURL         string    `gorm:"column:image_path" json:"image_url"`
	HarvestDate      time.Time `gorm:"column:harvested_date" json:"harvested_date"`
}

type PlantGrowth struct {
	GrowthID    int    `gorm:"column:growth_id" json:"growth_id"`
	UserPlantID int    `gorm:"column:user_plant_id" json:"user_plant_id"`
	PlantID     int    `gorm:"column:plant_id" json:"plant_id"`
	ImageURL    string `gorm:"column:image_url" json:"image_url"`
}

func (HarvestedPlant) TableName() string {
	return "harvested_plants"
}
