package service

import (
	"time"

	"example.com/go-echo-crud/internal/model"
	"gorm.io/gorm"
)

type HarvestSource struct {
	UserID   string
	Pname    string
	ImageURL string
}

type IPlantService interface {
	GetPlan() ([]model.Plant, error)
	GetHarvestedPlants(userId string) ([]model.HarvestedPlant, error)
	DeleteUserPlant(userPlantId int) error
	HarvestPlant(userPlantId int) error
}

type PlantService struct {
	db *gorm.DB
}

func NewPlantService(db *gorm.DB) *PlantService {
	return &PlantService{db: db}
}

func (s *PlantService) GetPlan() ([]model.Plant, error) {

	var plants []model.Plant
	if err := s.db.Find(&plants).Error; err != nil {
		return nil, err
	}
	return plants, nil
}

func (s *PlantService) GetHarvestedPlants(userId string) ([]model.HarvestedPlant, error) {
	var harvestedPlants []model.HarvestedPlant
	if err := s.db.Where("user_id = ?", userId).Find(&harvestedPlants).Error; err != nil {
		return nil, err
	}
	return harvestedPlants, nil
}

func (s *PlantService) DeleteUserPlant(userPlantId int) error {
	if err := s.db.
		Where("id = ?", userPlantId).
		Delete(&model.UserPlants{}).
		Error; err != nil {
		return err
	}

	return nil
}

func (s *PlantService) HarvestPlant(userPlantId int) error {
	tx := s.db.Begin()
	if tx.Error != nil {
		return tx.Error
	}

	var src HarvestSource

	if err := tx.
		Table("user_plants").
		Select(`
			user_plants.user_id,
			plants.pname,
			plants.image_url
		`).
		Joins("JOIN plants ON plants.plant_id = user_plants.plant_id").
		Where("user_plants.id = ?", userPlantId).
		Scan(&src).
		Error; err != nil {
		tx.Rollback()
		return err
	}

	harvested := model.HarvestedPlant{
		UserID:      src.UserID,
		Pname:       src.Pname,
		ImageURL:    src.ImageURL,
		HarvestDate: time.Now(),
	}

	if err := tx.
		Create(&harvested).
		Error; err != nil {
		tx.Rollback()
		return err
	}

	if err := tx.
		Where("id = ?", userPlantId).
		Delete(&model.UserPlants{}).
		Error; err != nil {
		tx.Rollback()
		return err
	}

	return tx.Commit().Error
}
