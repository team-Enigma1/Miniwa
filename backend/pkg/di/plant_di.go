package di

import (
	"example.com/go-echo-crud/internal/handler"
	gorm "example.com/go-echo-crud/internal/infra"
	"example.com/go-echo-crud/internal/service"
)

type PlantDi struct {
	Handler *handler.PlantHandler
}

func NewPlantDi() (*PlantDi, error) {
	db, err := gorm.InitDB()
    if err != nil {
        return nil, err
    }

	plantService := service.NewPlantService(db)
	plantHandler := handler.NewPlantHandler(plantService)

    return &PlantDi{Handler: plantHandler}, nil
}