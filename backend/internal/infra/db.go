package gorm

import (
	"fmt"
	"os"
	"sync"

	"github.com/joho/godotenv"
	"gorm.io/driver/postgres"
	"gorm.io/gorm"
)

var (
	db   *gorm.DB
	once sync.Once
)

func InitDB() (*gorm.DB, error) {
	var err error

	once.Do(func() {
		if e := godotenv.Load("config/.env"); e != nil {
			fmt.Println("Warning: .env file not found")
		}

		url := os.Getenv("DATABASE_URL")
		if url == "" {
			err = fmt.Errorf("DATABASE_URL not found")
			return
		}

		db, err = gorm.Open(postgres.Open(url), &gorm.Config{})
		if err != nil {
			return
		}

		fmt.Println("DB connect 200")
	})

	return db, err
}
