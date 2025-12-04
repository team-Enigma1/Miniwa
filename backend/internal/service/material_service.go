package service

import (
	"example.com/go-echo-crud/internal/model"
	"gorm.io/gorm"
)

type IMaterialService interface {
	FindAllSeeds(plantID int) ([]model.Seeds, error)
	FindAllFertilizers(plantID int) ([]model.Fertilizers, error)
	FindAllSoils(plantID int) ([]model.Soils, error)
}

type MaterialService struct {
	db *gorm.DB
}

func NewMaterialService(db *gorm.DB) *MaterialService {
	return &MaterialService{db: db}
}

func (s *MaterialService) FindAllSeeds(plantID int) ([]model.Seeds, error) {

	var seeds []model.Seeds

	query := s.db
	if plantID != 0 {
		query = query.Where("plant_id = ?", plantID)
	}

	if err := query.Find(&seeds).Error; err != nil {
		return nil, err
	}
	return seeds, nil
}

func (s *MaterialService) FindAllFertilizers(plantID int) ([]model.Fertilizers, error) {
	var fertilizers []model.Fertilizers

	query := s.db
	if plantID != 0 {
		query = query.Where("plant_id = ?", plantID)
	}

	if err := query.Find(&fertilizers).Error; err != nil {
		return nil, err
	}
	return  fertilizers, nil
}

func (s *MaterialService) FindAllSoils(plantID int) ([]model.Soils, error ) {
	var soils []model.Soils

	query := s.db
	if plantID != 0 {
		query = query.Where("plant_id = ?", plantID)
	}

	if err := query.Find(&soils).Error; err != nil {
		return  nil, err
	}
	return soils, nil
}

