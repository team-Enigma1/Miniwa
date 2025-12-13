package service

import (
	"example.com/go-echo-crud/internal/model"
	"gorm.io/gorm"
)


type ITodosService interface {
	GetUserTodo() ([]model.Todos, error)
}

type TodosService struct {
	db *gorm.DB
}

func NewTodosService(db *gorm.DB) *TodosService {
	return &TodosService{db: db}
}

func (s *TodosService) GetUserTodo() ([]model.Todos, error) {

	var todos []model.Todos
	if err := s.db.Find(&todos).Error; err != nil {
		return nil, err
	}
	return todos, nil
}
