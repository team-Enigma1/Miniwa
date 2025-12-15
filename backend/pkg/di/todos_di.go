package di

import (
	"example.com/go-echo-crud/internal/handler"
	"example.com/go-echo-crud/internal/service"
	gorm "example.com/go-echo-crud/internal/infra"
)

type TodosDi struct {
	Handler *handler.TodosHandler
}

func NewTodosDi() (*TodosDi, error) {
	db, err := gorm.InitDB()
	if err != nil {
		return nil, err
	}
	todosService := service.NewTodosService(db)
	todosHandler := handler.NewTodosHandler(todosService)

	return &TodosDi{Handler: todosHandler}, nil
}