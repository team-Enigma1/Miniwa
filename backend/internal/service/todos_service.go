package service

import (
	"example.com/go-echo-crud/internal/model"
	"gorm.io/gorm"
)


type ITodosService interface {
	GetUserTodo(userID string) ([]model.Todos, error)
	UpdateTodo(req model.UpdateUserTodo) ([]model.Todos, error)
    ResetTodos() error
}

type TodosService struct {
	db *gorm.DB
}

func NewTodosService(db *gorm.DB) *TodosService {
	return &TodosService{db: db}
}

func (s *TodosService) GetUserTodo(userID string) ([]model.Todos, error) {

	var todos []model.Todos
	if err := s.db.Where("user_id = ?", userID).Find(&todos).Error; err != nil {
		return nil, err
	}
	return todos, nil
}

func (s *TodosService) UpdateTodo(req model.UpdateUserTodo) ([]model.Todos, error) {
    tx := s.db.Begin()

    var userPlant model.UserPlant
    var plant model.Plant
    var todo model.Todos

    if err := tx.Where("id = ?", req.User_plant_id).First(&userPlant).Error; err != nil {
        tx.Rollback()
        return nil, err
    }

    if err := tx.Where("plant_id = ?", userPlant.PlantID).First(&plant).Error; err != nil {
        tx.Rollback()
        return nil, err
    }

    if err := tx.Where("user_plant_id = ?", req.User_plant_id).First(&todo).Error; err != nil {
        tx.Rollback()
        return nil, err
    }

    updates := map[string]interface{}{}
	newWaterCount := todo.Water_count

	if req.Water_count != nil {
		newWaterCount = todo.Water_count + int8(*req.Water_count)
		updates["water_count"] = newWaterCount
	}

	if req.Fertilizer != nil {
		updates["fertilizer"] = *req.Fertilizer
	}

	if newWaterCount >= plant.WateringSched {
		updates["water"] = true
	}


    if len(updates) > 0 {
        if err := tx.Model(&todo).
            Where("user_plant_id = ?", req.User_plant_id).
            Updates(updates).Error; err != nil {
            tx.Rollback()
            return nil, err
        }
    }

    var todos []model.Todos
    if err := tx.Where("user_plant_id = ?", req.User_plant_id).Find(&todos).Error; err != nil {
        tx.Rollback()
        return nil, err
    }

    return todos, tx.Commit().Error
}

func (s *TodosService) ResetTodos() error {
    return s.db.Model(&model.Todos{}).
        Updates(map[string]interface{}{
            "water": false,
            "water_count":  0,
            "fertilizer": false, // 肥料は毎日更新じゃないはずだから一旦調整待ち
        }).Error
}