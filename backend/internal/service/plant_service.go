package service

import (
	gorm "example.com/go-echo-crud/internal/infra"
	"example.com/go-echo-crud/internal/model"
)

func GetPlan() ([]model.Plant, error) {

	var plant []model.Plant
	if err := gorm.DB.Find(&plant).Error; err != nil {
		return nil, err
	}
	return plant, nil
}
