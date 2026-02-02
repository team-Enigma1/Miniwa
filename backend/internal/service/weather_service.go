package service

import (
	"encoding/json"
	"fmt"
	"net/http"
	"os"
	"time"

	"example.com/go-echo-crud/internal/model"
	"gorm.io/gorm"
)

type openWeatherResponse struct {
	Name string `json:"name"`
	Main struct {
		Temp float64 `json:"temp"`
	} `json:"main"`
	Weather []struct {
		Icon string `json:"icon"`
	} `json:"weather"`
}

type IWeatherService interface {
	FetchWeather(lat, lon float64) (*model.Weather, error)
}

type WeatherService struct {
	db *gorm.DB
}

func NewWeatherService(db *gorm.DB) *WeatherService {
	return &WeatherService{db: db}
}

func (s *WeatherService) FetchWeather(lat, lon float64) (*model.Weather, error) {
	apiKey := os.Getenv("OPEN_WEATHER_API_KEY")
	if apiKey == "" {
		return nil, fmt.Errorf("OPEN_WEATHER_API_KEY not set")
	}

	client := http.Client{Timeout: 5 * time.Second}

	url := fmt.Sprintf(
		"https://api.openweathermap.org/data/2.5/weather?lat=%f&lon=%f&appid=%s&units=metric",
		lat,
		lon,
		apiKey,
	)

	resp, err := client.Get(url)
	if err != nil {
		return nil, err
	}
	defer resp.Body.Close()

	if resp.StatusCode != http.StatusOK {
		return nil, fmt.Errorf("openweather error: %d", resp.StatusCode)
	}

	var raw openWeatherResponse
	if err := json.NewDecoder(resp.Body).Decode(&raw); err != nil {
		return nil, err
	}

	if len(raw.Weather) == 0 {
		return nil, fmt.Errorf("weather data empty")
	}

	return &model.Weather{
		City: raw.Name,
		Temp: raw.Main.Temp,
		Icon: raw.Weather[0].Icon,
	}, nil
}
