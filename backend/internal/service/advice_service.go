package service

import (
	"math/rand"
	"time"
	
	"gorm.io/gorm"
	"example.com/go-echo-crud/internal/model"
)

type IAdviceService interface {
	GetAdvice() (*model.Advices, error)
}

type AdviceService struct {
	db *gorm.DB
}

func NewAdviceService(db *gorm.DB) *AdviceService {
	return &AdviceService{db: db}
}

func (s *AdviceService) GetAdvice() (*model.Advices, error) {

	rand.Seed(time.Now().UnixNano())

	// 総件数を取得
	var count int64
	if err := s.db.Model(&model.Advices{}).Count(&count).Error; err != nil {
		return nil, err
	}

	if count == 0 {
		return nil, nil
	}

	// ランダムな offset
	offset := rand.Intn(int(count))

	var advice model.Advices
	if err := s.db.
		Offset(offset).
		Limit(1).
		Find(&advice).Error; err != nil {
		return nil, err
	}

	return &advice, nil
}
