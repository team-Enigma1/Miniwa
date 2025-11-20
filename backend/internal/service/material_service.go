package service

import (
	"example.com/go-echo-crud/internal/model"
	"gorm.io/gorm"
)

type IMaterialService interface {
	GetSeeds() ([]model.Seeds, error)
}

type MaterialService struct {
	db *gorm.DB
}

func NewMaterialService(db *gorm.DB) *MaterialService {
	return &MaterialService{db: db}
}

func (s *MaterialService) GetSeeds() ([]model.Seeds, error) {

	var seeds []model.Seeds
	if err := s.db.Find(&seeds).Error; err != nil {
		return nil, err
	}
	return seeds, nil
}

