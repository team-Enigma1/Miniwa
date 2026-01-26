package router

import (
	"example.com/go-echo-crud/internal/handler"
	"github.com/labstack/echo/v4"
)

func MaterialRouter(api *echo.Group, materialHandler *handler.MaterialHandler) {

	material := api.Group("/material")

	material.GET("/seeds", materialHandler.FindAllSeeds)
	material.GET("/fertilizers", materialHandler.FindAllFertilizers)
	material.GET("/soils", materialHandler.FindAllSoils)
}
