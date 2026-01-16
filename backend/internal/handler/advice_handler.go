package handler

import (
	"net/http"

	"example.com/go-echo-crud/internal/service"
	"github.com/labstack/echo/v4"
)

type AdviceHandler struct {
	adviceService service.IAdviceService
}

func NewAdviceHandler(adviceService service.IAdviceService) *AdviceHandler {
	return &AdviceHandler{adviceService: adviceService}
}

func (h *AdviceHandler) GetAdvice(c echo.Context) error {
	advice, err := h.adviceService.GetAdvice()
	if err != nil {
		return c.JSON(http.StatusInternalServerError, map[string]string{
			"error": err.Error(),
		})
	}
	return c.JSON(http.StatusOK, advice)
}