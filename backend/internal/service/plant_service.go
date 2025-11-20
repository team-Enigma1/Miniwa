package service

import (
	"example.com/go-echo-crud/internal/model"
	"gorm.io/gorm"
)

type IPlantService interface {
	GetPlan() ([]model.Plant, error)
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
