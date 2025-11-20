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

func (h *MaterialHandler) GetSeeds(c echo.Context) error {
	seeds, err := h.materialService.GetSeeds()
	if err != nil {
		return c.JSON(http.StatusInternalServerError, map[string]string{
			"error": err.Error(),
		})
	}
	return c.JSON(http.StatusOK, seeds)
}


