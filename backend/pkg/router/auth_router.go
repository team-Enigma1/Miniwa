package router

import (
	"example.com/go-echo-crud/internal/handler"
	"github.com/labstack/echo/v4"
)

func AuthRouter(e *echo.Echo, authHandler *handler.AuthHandler) {

	api := e.Group("/auth")

	api.POST("/login", authHandler.Login)
	api.POST("/signup", authHandler.Signup)
}
