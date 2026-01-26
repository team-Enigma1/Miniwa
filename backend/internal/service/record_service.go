package service

import (
	"errors"

	"example.com/go-echo-crud/internal/model"
	"gorm.io/gorm"
)

type IRecordService interface {
	GetPlantRecord(userID string, plantID int) ([]model.Records, error)
	CreatePlantRecord(data *model.Records) (*model.Records, error)
	UpdatePlantRecord(userID string, recordID int, data *model.Records) (*model.Records, error)
	DeletePlantRecord(userID string, recordID int) error
}

type RecordService struct {
	db *gorm.DB
}

func NewRecordService(db *gorm.DB) *RecordService {
	return &RecordService{db: db}
}

func (s *RecordService) GetPlantRecord(userID string, userPlantID int) ([]model.Records, error) {
	var records []model.Records

	err := s.db.
		Where("user_id = ? AND user_plant_id = ?", userID, userPlantID).
		Order("created_at DESC").
		Find(&records).Error

	return records, err
}

func (s *RecordService) CreatePlantRecord(data *model.Records) (*model.Records, error) {

	if err := s.db.Create(data).Error; err != nil {
		return nil, err
	}

	return data, nil
}

func (s *RecordService) UpdatePlantRecord(userID string, recordID int, data *model.Records) (*model.Records, error) {
	updates := make(map[string]interface{})

	if data.Title != "" {
		updates["title"] = data.Title
	}

	if data.Content != "" {
		updates["content"] = data.Content
	}

	if data.ImageURL != "" {
		updates["image_path"] = data.ImageURL
	}

	if len(updates) == 0 {
		return nil, errors.New("更新情報は見つかりません！")
	}

	//Update record data
	if err := s.db.Model(&model.Records{}).
		Where("id = ? AND user_id = ?", recordID, userID).
		Updates(updates).Error; err != nil {
		return nil, err
	}

	//Get new record data
	var record model.Records
	if err := s.db.
		Where("id = ? AND user_id = ?", recordID, userID).
		First(&record).Error; err != nil {
		return nil, err
	}

	return &record, nil
}

func (s *RecordService) DeletePlantRecord(userID string, recordID int) error {
	if err := s.db.
		Where("id = ? AND user_id = ?", recordID, userID).
		Delete(&model.Records{}).
		Error; err != nil {
		return err
	}
	return nil
}
