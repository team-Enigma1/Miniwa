package service

import (
	"errors"

	"example.com/go-echo-crud/internal/model"
	"gorm.io/gorm"
)

type IUserService interface {
	RegisterUserPlant(data *model.UserPlant) (*model.UserPlant, error)
	GetUserData(user_id string) (*model.User, error)
	GetUserPlants(userID string) ([]model.Plant, error)
	UpdateUserData(user_id string, data *model.User) (*model.User, error)
	UpdateLocation(userID string, location string) error
}

type UserService struct {
	db *gorm.DB
}

func NewUserService(db *gorm.DB) *UserService {
	return &UserService{db: db}
}

func (s *UserService) RegisterUserPlant(data *model.UserPlant) (*model.UserPlant, error) {

	if err := s.db.Create(data).Error; err != nil {
		return nil, err
	}

	return data, nil
}

func (s *UserService) GetUserData(user_id string) (*model.User, error) {
	var user model.User
	if err := s.db.First(&user, "user_id = ?", user_id).Error; err != nil {
		return nil, err
	}

	return &user, nil
}

func (s *UserService) UpdateUserData(user_id string, data *model.User) (*model.User, error) {
	updates := make(map[string]interface{})

	if data.Username != "" {
		updates["username"] = data.Username
	}

	if data.ProfileImg != "" {
		updates["profile_img"] = data.ProfileImg
	}

	if data.Description != "" {
		updates["description"] = data.Description
	}

	if len(updates) == 0 {
		return nil, errors.New("更新情報は見つかりません！")
	}

	//Update user data
	if err := s.db.Model(&model.User{}).
		Where("user_id = ?", user_id).
		Updates(updates).Error; err != nil {
		return nil, err
	}

	//Get update data
	var user model.User
	if err := s.db.First(&user, "user_id = ?", user_id).Error; err != nil {
		return nil, err
	}

	return &user, nil
}

func (s *UserService) UpdateLocation(userID, location string) error {
	return s.db.
		Model(&model.User{}).
		Where("user_id = ?", userID).
		Update("location", location).
		Error
}

func (s *UserService) GetUserPlants(userID string) ([]model.Plant, error) {
	var plants []model.Plant

	if err := s.db.Table("user_plants").
		Select("plants.*").
		Joins("JOIN plants ON plants.plant_id = user_plants.plant_id").
		Where("user_plants.user_id = ?", userID).
		Scan(&plants).Error; err != nil {
		return nil, err
	}
	return plants, nil
}
