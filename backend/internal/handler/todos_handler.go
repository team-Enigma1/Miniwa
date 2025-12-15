package handler

import (
	"net/http"

	"example.com/go-echo-crud/internal/service"
	"github.com/labstack/echo/v4"
)

type TodosHandler struct {
	todosService service.ITodosService
}

func NewTodosHandler(todosService service.ITodosService) *TodosHandler {
	return &TodosHandler{todosService: todosService}
}

func ( h *TodosHandler) GetUserTodo(c echo.Context) error {
	todos, err := h.todosService.GetUserTodo()
	if err != nil {
		return c.JSON(http.StatusInternalServerError, map[string]string{
			"error": err.Error(),
		})
	}
	return  c.JSON(http.StatusOK, todos)
}
