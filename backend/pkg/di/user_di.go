package di

import (
	"example.com/go-echo-crud/internal/handler"
	gorm "example.com/go-echo-crud/internal/infra"
	"example.com/go-echo-crud/internal/service"
)

type UserDi struct {
	Handler *handler.UserHandler
}

func NewRegisterDi() (*UserDi, error) {
	db, err := gorm.InitDB()
	if err != nil {
		return nil, err
	}

	userService := service.NewUserService(db)
	userHandler := handler.NewUserHandler(userService)

	return &UserDi{Handler: userHandler}, nil
}
