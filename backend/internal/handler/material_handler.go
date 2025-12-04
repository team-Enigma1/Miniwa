package handler

import (
	"net/http"

	"example.com/go-echo-crud/internal/service"
	"github.com/labstack/echo/v4"
)

type Request struct {
	Plant_id	int		`json:"plant_id"`
}

type MaterialHandler struct {
	materialService service.IMaterialService
}

func NewMaterialHandler(materialService service.IMaterialService) *MaterialHandler {
	return &MaterialHandler{materialService: materialService}
}

func (h *MaterialHandler) FindAllSeeds(c echo.Context) error {

	req := new(Request)
	if err := c.Bind(req); err != nil {
		return c.JSON(http.StatusBadRequest, map[string]string{"error": "invalid request"})
	}

	seeds, err := h.materialService.FindAllSeeds(req.Plant_id)
	if err != nil {
		return c.JSON(http.StatusInternalServerError, map[string]string{
			"error": err.Error(),
		})
	}
	return c.JSON(http.StatusOK, seeds)
}

func (h *MaterialHandler) FindAllFertilizers(c echo.Context) error {

	req := new(Request)
	if err := c.Bind(req); err != nil {
		return c.JSON(http.StatusBadRequest, map[string]string{"error": "invalid request"})
	}

	fertilizers, err := h.materialService.FindAllFertilizers(req.Plant_id)
	if err != nil {
		return c.JSON(http.StatusInternalServerError, map[string]string{
			"error": err.Error(),
		})
	}
	return c.JSON(http.StatusOK, fertilizers)
}

func (h *MaterialHandler) FindAllSoils(c echo.Context) error {

	req := new(Request)
	if err := c.Bind(req); err != nil {
		return c.JSON(http.StatusBadRequest, map[string]string{"error": "invalid request"})
	}

	soils, err := h.materialService.FindAllSoils(req.Plant_id)
	if err != nil {
		return c.JSON(http.StatusInternalServerError, map[string]string{
			"error": err.Error(),
		})
	}
	return c.JSON(http.StatusOK, soils)
}




