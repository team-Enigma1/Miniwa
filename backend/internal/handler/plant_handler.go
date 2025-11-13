package handler

import (
	"net/http"

	service "example.com/go-echo-crud/internal/service"
	"github.com/labstack/echo/v4"
)

func GetPlan(c echo.Context) error {
	plans, err := service.GetPlan()
	if err != nil {
		return c.JSON(http.StatusInternalServerError,map[string]string{
			"error": err.Error(),
		})
	}
	return  c.JSON(http.StatusOK, plans)
}