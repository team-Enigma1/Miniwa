package router

import (
	"example.com/go-echo-crud/internal/handler"
	mw "example.com/go-echo-crud/pkg/middleware"
	"github.com/labstack/echo/v4"
)

func UserRoute(api *echo.Group, userHandler *handler.UserHandler) {

	user := api.Group("/user", mw.SupabaseJWT())

	user.GET("/data", userHandler.GetUserData)
	user.GET("/plants", userHandler.GetUserPlants)
	user.PUT("/update", userHandler.UpdateUserData)
	user.POST("/userPlant", userHandler.RegisterUserPlant)
	user.PUT("/location", userHandler.UpdateLocation)
}
