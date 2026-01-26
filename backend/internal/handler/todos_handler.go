package handler

import (
	"net/http"

	"example.com/go-echo-crud/internal/model"
	"example.com/go-echo-crud/internal/service"
	"github.com/labstack/echo/v4"
)

type TodosHandler struct {
	todosService service.ITodosService
}
//--------------------------

func NewTodosHandler(todosService service.ITodosService) *TodosHandler {
	return &TodosHandler{todosService: todosService}
}

func (h *TodosHandler) GetUserTodo(c echo.Context) error {
	type Request struct {
		UserPlantID int `json:"user_plant_id"`
	}

	req := new(Request)
	if err := c.Bind(req); err != nil {
		return c.JSON(http.StatusBadRequest, map[string]string{
			"error": "invalid request body",
		})
	}

	todos, err := h.todosService.GetUserTodo(req.UserPlantID)
	if err != nil {
		return c.JSON(http.StatusInternalServerError, map[string]string{
			"error": err.Error(),
		})
	}

	return c.JSON(http.StatusOK, todos)
}


func (h *TodosHandler) UpdateTodo(c echo.Context) error {
	var req model.UpdateUserTodo

	if err := c.Bind(&req); err != nil {
		return c.JSON(http.StatusBadRequest, map[string]string{"error": err.Error()})
	}

	updateTodo, err := h.todosService.UpdateTodo(req)
	if err != nil {
		return c.JSON(http.StatusInternalServerError, map[string]string{
			"error": err.Error(),
		})
	}
	return c.JSON(http.StatusOK, updateTodo)
}
