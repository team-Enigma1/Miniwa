package di

import (
	"example.com/go-echo-crud/internal/handler"
	gorm "example.com/go-echo-crud/internal/infra"
	"example.com/go-echo-crud/internal/service"
)

type AdviceDi struct {
	Handler *handler.AdviceHandler
}

func NewAdviceDi() (*AdviceDi, error) {
	db, err := gorm.InitDB()
	if err != nil {
		return nil, err
	}

	adviceService := service.NewAdviceService(db)
	adviceHandler := handler.NewAdviceHandler(adviceService)

	return &AdviceDi{Handler: adviceHandler}, nil
}
