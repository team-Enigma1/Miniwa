package router

import (
	"example.com/go-echo-crud/internal/handler"
	"github.com/labstack/echo/v4"
)

func PlantRouter(e *echo.Echo, plantHandler *handler.PlantHandler) {

	api := e.Group("/plant")

	api.GET("/plan", plantHandler.GetPlan)

}
