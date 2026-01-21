package handler

import (
	"net/http"
	"strconv"

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
		return c.JSON(http.StatusInternalServerError, map[string]string{
			"error": err.Error(),
		})
	}
	return c.JSON(http.StatusOK, plans)
}

func (h *PlantHandler) GetHarvestedPlants(c echo.Context) error {
	userID, ok := c.Get("user_id").(string)
	if !ok || userID == "" {
		return echo.NewHTTPError(http.StatusUnauthorized, "Unauthorized: user_id not found in context")
	}

	plants, err := h.plantService.GetHarvestedPlants(userID)
	if err != nil {
		return echo.NewHTTPError(http.StatusInternalServerError, "Failed to retrieve harvested plants")
	}
	return c.JSON(http.StatusOK, plants)
}

func (h *PlantHandler) DeleteUserPlant(c echo.Context) error {
	idParam := c.Param("id")

	userPlantId, err := strconv.Atoi(idParam)
	if err != nil {
		return echo.NewHTTPError(
			http.StatusBadRequest,
			"Invalid userPlantId",
		)
	}

	if err := h.plantService.DeleteUserPlant(userPlantId); err != nil {
		return echo.NewHTTPError(
			http.StatusInternalServerError,
			"Failed to delete plant",
		)
	}

	return c.JSON(http.StatusOK, map[string]string{
		"message": "Plant deleted successfully",
	})
}

func (h *PlantHandler) HarvestPlant(c echo.Context) error {
	idParam := c.Param("id")

	userPlantId, err := strconv.Atoi(idParam)
	if err != nil {
		return echo.NewHTTPError(
			http.StatusBadRequest,
			"Invalid userPlantId",
		)
	}

	if err := h.plantService.HarvestPlant(userPlantId); err != nil {
		return echo.NewHTTPError(
			http.StatusInternalServerError,
			"Failed to harvest plant",
		)
	}

	return c.JSON(http.StatusOK, map[string]string{
		"message": "Plant harvested successfully",
	})
}
