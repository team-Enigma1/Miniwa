package service

import (
	"example.com/go-echo-crud/internal/model"
	"gorm.io/gorm"
)

type IUserService interface {
	RegisterUserPlant(data *model.UserPlant) (*model.UserPlant, error)
	GetUserData(user_id string) (*model.User, error)
	UpdateUserData(user_id string, data *model.User) (*model.User, error)
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
	var user model.User
	err := s.db.Model(&user).
		Where("user_id = ?", user_id).
		Updates(map[string]interface{}{
			"username":    data.Username,
			"profile_img": data.ProfileImg,
			"description": data.Description,
		}).Error

	if err != nil {
		return nil, err
	}

	s.db.First(&user, "user_id = ?", user_id)

	return &user, nil
}
