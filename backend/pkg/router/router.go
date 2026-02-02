package router

import (
	"example.com/go-echo-crud/pkg/di"
	"github.com/labstack/echo/v4"
)

func Setup(api *echo.Group, c *di.Container) {
	PlantRouter(api, c.PlantHandler)
	AuthRouter(api, c.AuthHandler)
	MaterialRouter(api, c.MaterialHandler)
	UserRoute(api, c.UserHandler)
	TodosRouter(api, c.TodosHandler)
	AdvicesRouter(api, c.AdviceHandler)
	RecordHandler(api, c.RecordHandler)
}

func PublicSetup(e *echo.Echo, c *di.Container) {
	WeatherRoute(e, c.WeatherHandler)
}
