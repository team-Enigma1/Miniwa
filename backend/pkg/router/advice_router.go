package router

import (
	"example.com/go-echo-crud/internal/handler"
	"github.com/labstack/echo/v4"
)

func AdvicesRouter(e *echo.Echo, adviceHandler * handler.AdviceHandler) {
	api := e.Group("/advice")

	api.GET("", adviceHandler.GetAdvice)
}