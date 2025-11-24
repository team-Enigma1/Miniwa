package di

import (
	"example.com/go-echo-crud/internal/handler"
	gorm "example.com/go-echo-crud/internal/infra"
	"example.com/go-echo-crud/internal/service"
)

type MaterialDi struct {
	Handler *handler.MaterialHandler
}

func NewMaterialDi() (*MaterialDi, error) {
	db, err := gorm.InitDB()
	if err != nil {
		return nil, err
	}

	materialService := service.NewMaterialService(db)
	materialHandler := handler.NewMaterialHandler(materialService)

	return &MaterialDi{Handler: materialHandler}, nil
}
