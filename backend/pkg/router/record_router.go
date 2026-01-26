package router

import (
	"example.com/go-echo-crud/internal/handler"
	"github.com/labstack/echo/v4"
)

func RecordHandler(api *echo.Group, recordHandler *handler.RecordHandler) {

	record := api.Group("/record")

	record.GET("/get/:user_plant_id", recordHandler.GetPlantRecord)
	record.POST("/create", recordHandler.CreatePlantRecord)
	record.PUT("/update/:id", recordHandler.UpdatePlantRecord)
	record.DELETE("/delete/:id", recordHandler.DeletePlantRecord)
}
