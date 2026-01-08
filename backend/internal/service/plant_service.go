package service

import (
	"fmt"

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
		fmt.Println("DB ERROR:", err)
		return nil, err
	}
	return plants, nil
}
