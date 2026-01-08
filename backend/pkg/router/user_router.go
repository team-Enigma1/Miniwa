package router

import (
	"example.com/go-echo-crud/internal/handler"
	mw "example.com/go-echo-crud/pkg/middleware"
	"github.com/labstack/echo/v4"
)

func UserRoute(e *echo.Echo, userHandler *handler.UserHandler) {
	api := e.Group("/user", mw.SupabaseJWT())

	api.POST("/registerPlant", userHandler.RegisterUserPlant)
	api.GET("/data", userHandler.GetUserData)
	api.POST("/update", userHandler.UpdateUserData)
}
