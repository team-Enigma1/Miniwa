package router

import (
	"example.com/go-echo-crud/internal/handler"
	"github.com/labstack/echo/v4"
)

func RegisterAuthRoutes(e *echo.Echo) {
	e.POST("/signup", handler.SignupHandler)
	e.POST("/login", handler.LoginHandler)
	e.POST("/google-login", handler.GoogleLoginHandler)
}
