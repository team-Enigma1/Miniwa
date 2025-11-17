package handler

import (
	"net/http"

	
	"example.com/go-echo-crud/internal/service"
	"github.com/labstack/echo/v4"
)


type PlantHandler struct {
	plantService service.IPlantService
}

func NewPlantHandler(plantService service.IPlantService) *PlantHandler {
	return &PlantHandler{plantService: plantService}
}

func (h *PlantHandler) GetPlan(c echo.Context) error {
	plans, err := h.plantService.GetPlan()
	if err != nil {
		return c.JSON(http.StatusInternalServerError,map[string]string{
			"error": err.Error(),
		})
	}
	return  c.JSON(http.StatusOK, plans)
}