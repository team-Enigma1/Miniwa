package di

import "example.com/go-echo-crud/internal/handler"

type Container struct {
	PlantHandler *handler.PlantHandler
	AuthHandler  *handler.AuthHandler
	MaterialHandler	*handler.MaterialHandler
}

func NewContainer() (*Container, error) {
	plant, err := NewPlantDi()
	if err != nil {
		return nil, err
	}

	material, err := NewMaterialDi()
	if err != nil {
		return nil,err
	} 

	auth, err := NewAuthDI()
	if err != nil {
		return nil, err
	}

	return &Container{
		PlantHandler: plant.Handler,
        AuthHandler:  auth.Handler,
		MaterialHandler: material.Handler,
	}, nil
}
