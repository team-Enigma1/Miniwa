package service

import (
	"example.com/go-echo-crud/internal/model"
	"gorm.io/gorm"
)

type IMaterialService interface {
	FindAllSeeds() ([]model.Seeds, error)
	FindAllFertilizers() ([]model.Fertilizers, error)
	FindAllSoils() ([]model.Soils, error)
}

type MaterialService struct {
	db *gorm.DB
}

func NewMaterialService(db *gorm.DB) *MaterialService {
	return &MaterialService{db: db}
}

func (s *MaterialService) FindAllSeeds() ([]model.Seeds, error) {

	var seeds []model.Seeds
	if err := s.db.Find(&seeds).Error; err != nil {
		return nil, err
	}
	return seeds, nil
}

func (s *MaterialService) FindAllFertilizers() ([]model.Fertilizers, error) {
	var fertilizers []model.Fertilizers
	if err := s.db.Find(&fertilizers).Error; err != nil {
		return nil, err
	}
	return  fertilizers, nil
}

func (s *MaterialService) FindAllSoils() ([]model.Soils, error ) {
	var soils []model.Soils
	if err := s.db.Find(&soils).Error; err != nil {
		return  nil, err
	}
	return soils, nil
}

