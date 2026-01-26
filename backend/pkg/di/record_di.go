package di

import (
	"example.com/go-echo-crud/internal/handler"
	gorm "example.com/go-echo-crud/internal/infra"
	"example.com/go-echo-crud/internal/service"
)

type RecordDi struct {
	Handler *handler.RecordHandler
}

func NewRecordDi() (*RecordDi, error) {
	db, err := gorm.InitDB()
	if err != nil {
		return nil, err
	}

	recordService := service.NewRecordService(db)
	recordHandler := handler.NewRecordHandler(recordService)

	return &RecordDi{Handler: recordHandler}, nil
}
