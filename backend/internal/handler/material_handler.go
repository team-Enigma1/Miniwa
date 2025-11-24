package handler

import (
	"net/http"

	"example.com/go-echo-crud/internal/service"
	"github.com/labstack/echo/v4"
)


type MaterialHandler struct {
	materialService service.IMaterialService
}

func NewMaterialHandler(materialService service.IMaterialService) *MaterialHandler {
	return &MaterialHandler{materialService: materialService}
}

func (h *MaterialHandler) FindAllSeeds(c echo.Context) error {
	seeds, err := h.materialService.FindAllSeeds()
	if err != nil {
		return c.JSON(http.StatusInternalServerError, map[string]string{
			"error": err.Error(),
		})
	}
	return c.JSON(http.StatusOK, seeds)
}

func (h *MaterialHandler) FindAllFertilizers(c echo.Context) error {
	fertilizers, err := h.materialService.FindAllFertilizers()
	if err != nil {
		return c.JSON(http.StatusInternalServerError, map[string]string{
			"error": err.Error(),
		})
	}
	return c.JSON(http.StatusOK, fertilizers)
}

func (h *MaterialHandler) FindAllSoils(c echo.Context) error {
	soils, err := h.materialService.FindAllSoils()
	if err != nil {
		return c.JSON(http.StatusInternalServerError, map[string]string{
			"error": err.Error(),
		})
	}
	return c.JSON(http.StatusOK, soils)
}




