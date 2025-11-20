package router

import (
	"example.com/go-echo-crud/internal/handler"
	"github.com/labstack/echo/v4"
)

func MaterialRouter (e *echo.Echo,  materialHandler *handler.MaterialHandler) {

	api := e.Group("/material")

	api.GET("/", materialHandler.GetSeeds)
}