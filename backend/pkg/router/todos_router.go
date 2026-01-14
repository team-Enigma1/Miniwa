package router

import (
	"example.com/go-echo-crud/internal/handler"
	"github.com/labstack/echo/v4"
)

func TodosRouter(e *echo.Echo, TodosHandler *handler.TodosHandler) {

	api := e.Group("/todos")

	api.POST("", TodosHandler.GetUserTodo)
	api.PUT("", TodosHandler.UpdateTodo)
	
}
