package router

import (
	"example.com/go-echo-crud/internal/handler"
	"github.com/labstack/echo/v4"
)

func TodosRouter(e *echo.Echo, TodosHandler *handler.TodosHandler) {

	api := e.Group("/todos")

	api.GET("/plan", TodosHandler.GetUserTodo)

}
