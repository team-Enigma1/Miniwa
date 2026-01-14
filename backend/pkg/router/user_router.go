package router

import (
	"example.com/go-echo-crud/internal/handler"
	"github.com/labstack/echo/v4"
	mw "example.com/go-echo-crud/pkg/middleware"
	
)

func UserRoute(e *echo.Echo, userHandler *handler.UserHandler) {

	api := e.Group("/user", mw.SupabaseJWT())

	api.GET("/data", userHandler.GetUserData)
	api.POST("/update", userHandler.UpdateUserData)
	api.POST("/userPlant", userHandler.RegisterUserPlant)
	api.PUT("/location", userHandler.UpdateLocation)
}
