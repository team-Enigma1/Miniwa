package router

import (
	"example.com/go-echo-crud/internal/handler"
	"github.com/labstack/echo/v4"
)

func RecordHandler(e *echo.Echo, recordHandler *handler.RecordHandler) {

	api := e.Group("/record")

	api.GET("/get/:user_plant_id", recordHandler.GetPlantRecord)
	api.POST("/create", recordHandler.CreatePlantRecord)
	api.PUT("/update/:id", recordHandler.UpdatePlantRecord)
	api.DELETE("/delete/:id", recordHandler.DeletePlantRecord)
}
