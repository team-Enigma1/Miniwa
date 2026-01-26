package router

import (
	"example.com/go-echo-crud/internal/handler"
	"github.com/labstack/echo/v4"
)

func AuthRouter(api *echo.Group, authHandler *handler.AuthHandler) {

	auth := api.Group("/auth")

	auth.POST("/login", authHandler.Login)
	auth.POST("/signup", authHandler.Signup)
}
