package router

import (
	"example.com/go-echo-crud/internal/handler"
	"github.com/labstack/echo/v4"
)

func AdvicesRouter(api *echo.Group, adviceHandler *handler.AdviceHandler) {
	advice := api.Group("/advice")

	advice.GET("", adviceHandler.GetAdvice)
}
