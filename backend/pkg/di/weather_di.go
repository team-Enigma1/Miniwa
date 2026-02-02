package di

import (
	"example.com/go-echo-crud/internal/handler"
	gorm "example.com/go-echo-crud/internal/infra"
	"example.com/go-echo-crud/internal/service"
)

type WeatherDi struct {
	Handler *handler.WeatherHandler
}

func NewWeatherDi() (*WeatherDi, error) {
	db, err := gorm.InitDB()
	if err != nil {
		return nil, err
	}

	weatherService := service.NewWeatherService(db)
	weatherHandler := handler.NewWeatherHandler(weatherService)

	return &WeatherDi{Handler: weatherHandler}, nil
}
