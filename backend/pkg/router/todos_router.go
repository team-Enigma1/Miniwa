package router

import (
	"example.com/go-echo-crud/internal/handler"
	"github.com/labstack/echo/v4"
)

func TodosRouter(api *echo.Group, TodosHandler *handler.TodosHandler) {

	todo := api.Group("/todos")

	todo.POST("", TodosHandler.GetUserTodo)
	todo.PUT("", TodosHandler.UpdateTodo)

}
