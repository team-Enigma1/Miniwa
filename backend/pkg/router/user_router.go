package router

import (
	"example.com/go-echo-crud/internal/handler"
	mw "example.com/go-echo-crud/pkg/middleware"
	"github.com/labstack/echo/v4"
)

func UserRoute(e *echo.Echo, userHandler *handler.UserHandler) {

	api := e.Group("/user", mw.SupabaseJWT())

	api.GET("/data", userHandler.GetUserData)
	api.GET("/plants", userHandler.GetUserPlants)
	api.PUT("/update", userHandler.UpdateUserData)
	api.POST("/userPlant", userHandler.RegisterUserPlant)
	api.PUT("/location", userHandler.UpdateLocation)
}
