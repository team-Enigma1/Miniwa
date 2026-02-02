package router

import (
	"example.com/go-echo-crud/internal/handler"
	"github.com/labstack/echo/v4"
)

func WeatherRoute(e *echo.Echo, weatherHandler *handler.WeatherHandler) {

	weather := e.Group("/weather")

	weather.GET("", weatherHandler.GetWeather)
}
