package handler

import (
	"net/http"
	"strconv"

	"example.com/go-echo-crud/internal/service"
	"github.com/labstack/echo/v4"
)

type WeatherHandler struct {
	weatherService service.IWeatherService
}

func NewWeatherHandler(weatherService service.IWeatherService) *WeatherHandler {
	return &WeatherHandler{weatherService: weatherService}
}

func (h *WeatherHandler) GetWeather(c echo.Context) error {
	latStr := c.QueryParam("lat")
	lonStr := c.QueryParam("lon")

	if latStr == "" || lonStr == "" {
		return c.JSON(http.StatusBadRequest, echo.Map{
			"error": "lat and lon are required",
		})
	}

	lat, err := strconv.ParseFloat(latStr, 64)
	if err != nil {
		return c.JSON(http.StatusBadRequest, echo.Map{
			"error": "invalid lat",
		})
	}

	lon, err := strconv.ParseFloat(lonStr, 64)
	if err != nil {
		return c.JSON(http.StatusBadRequest, echo.Map{
			"error": "invalid lon",
		})
	}

	weather, err := h.weatherService.FetchWeather(lat, lon)
	if err != nil {
		return c.JSON(http.StatusBadGateway, echo.Map{
			"error": err.Error(),
		})
	}

	return c.JSON(http.StatusOK, weather)
}
