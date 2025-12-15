package router

import (
	"example.com/go-echo-crud/pkg/di"
	"github.com/labstack/echo/v4"
)

func Setup(e *echo.Echo, c *di.Container) {
    PlantRouter(e, c.PlantHandler)
    AuthRouter(e, c.AuthHandler)
	MaterialRouter(e,c.MaterialHandler)
	UserRoute(e, c.UserHandler)
	TodosRouter(e, c.TodosHandler)
}
