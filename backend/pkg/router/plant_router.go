package router

import (
	"example.com/go-echo-crud/internal/handler"
	"github.com/labstack/echo/v4"
)

func PlantRouter(api *echo.Group, plantHandler *handler.PlantHandler) {

	plant := api.Group("/plant")

	plant.GET("/plan", plantHandler.GetPlan)
	plant.GET("/harvested", plantHandler.GetHarvestedPlants)
	plant.DELETE("/user/:id", plantHandler.DeleteUserPlant)
	plant.POST("/user/:id/harvest", plantHandler.HarvestPlant)
	plant.GET("/growth/:id", plantHandler.GetPlantGrowthImg)
}
