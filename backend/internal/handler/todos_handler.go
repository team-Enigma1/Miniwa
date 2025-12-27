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

// ミドルウェアできるまで
type Req struct {
	UserId string `json:"user_id"`
}

//--------------------------

func NewTodosHandler(todosService service.ITodosService) *TodosHandler {
	return &TodosHandler{todosService: todosService}
}

func (h *TodosHandler) GetUserTodo(c echo.Context) error {

	//ミドルウェアできたらuser_idもらってそのユーザーのTodoをもってくる
	var UserId = "60c9c8df-2ba3-43de-954c-5aa1000aa28c"

	todos, err := h.todosService.GetUserTodo(UserId)
	if err != nil {
		return c.JSON(http.StatusInternalServerError, map[string]string{
			"error": err.Error(),
		})
	}
	return c.JSON(http.StatusOK, todos)
}

func (h *TodosHandler) UpdeteTodo(c echo.Context) error {
	var req model.UpdeteUserTodo

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
