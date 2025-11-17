package gorm

import (
	"fmt"
	"log"
	"os"

	"gorm.io/driver/postgres"
	"gorm.io/gorm"
	"github.com/joho/godotenv"
)

var DB *gorm.DB

func InitDB() {

	err := godotenv.Load("config/.env")
	if err != nil {
		log.Println("Warning: .env file not found")
	}

	url := os.Getenv("DATABASE_URL")
	if url == "" {
		log.Fatal("DATABASE_URL not found")
	}

	var err2 error

	DB, err2 = gorm.Open(postgres.Open(url), &gorm.Config{})
	if err2 != nil {
		log.Fatalf("Failed to connect database: %v", err2)
	}

	fmt.Println( "DB connect 200")
}
