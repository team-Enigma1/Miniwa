package model

type Plant struct {
	PlantID        int    `gorm:"column:plant_id;primaryKey" json:"plant_id"`
	Pname          string `gorm:"column:pname" json:"name"`
	SoilID         int    `gorm:"column:soil_id" json:"soil_id"`
	Description    string `gorm:"column:description" json:"description"`
	ImageURL       string `gorm:"column:image_url" json:"image_url"`
	WateringSched  int    `gorm:"column:watering_sched" json:"watering_sched"`
	Sunlight       string `gorm:"column:sunlight" json:"sunlight"`
	GrowthDuration int    `gorm:"column:growth_duration" json:"growth_duration"`
	Season         string `gorm:"column:season" json:"season"`
}