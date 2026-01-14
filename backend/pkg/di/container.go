package di

import (
	"example.com/go-echo-crud/internal/handler"
	"example.com/go-echo-crud/internal/service"
)

type Container struct {
	PlantHandler *handler.PlantHandler
	AuthHandler  *handler.AuthHandler
	MaterialHandler	*handler.MaterialHandler
	UserHandler *handler.UserHandler
	TodosHandler *handler.TodosHandler
	TodosService service.ITodosService
	AdviceHandler *handler.AdviceHandler
}

func NewContainer() (*Container, error) {
	plant, err := NewPlantDi()
	if err != nil {
		return nil, err
	}

	material, err := NewMaterialDi()
	if err != nil {
		return nil, err
	} 

	auth, err := NewAuthDI()
	if err != nil {
		return nil, err
	}

	user, err := NewRegisterDi()
	if err != nil {
		return  nil, err
	}

	todos, err := NewTodosDi()
	if err != nil {
		return  nil, err
	}

	advices, err := NewAdviceDi()
	if err != nil {
		return nil, err
	}
	
	return &Container{
		PlantHandler: plant.Handler,
        AuthHandler:  auth.Handler,
		MaterialHandler: material.Handler,
		UserHandler: user.Handler,
		TodosHandler: todos.Handler,
		TodosService: todos.Service,
		AdviceHandler: advices.Handler,
	}, nil
}
