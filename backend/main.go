package main

import (
	"fmt"
	"log"
	"os"

	"example.com/go-echo-crud/pkg/di"
	"example.com/go-echo-crud/pkg/middleware"
	"example.com/go-echo-crud/pkg/router"
	"github.com/joho/godotenv"
	"github.com/labstack/echo/v4"
)

func main() {
	// Load .env
	if err := godotenv.Load(); err != nil {
		log.Println(".env file not found:", err)
	}

	supabaseURL := os.Getenv("Project_URL")
	if supabaseURL == "" {
		log.Fatal("Project_URL is not set in environment variables")
	}

	e := echo.New()

	middleware.SupabaseJWT()

	middleware.Setup(e)

	container, err := di.NewContainer()
	if err != nil {
		log.Fatal(err)
	}

	router.Setup(e, container)

	port := "8080"
	fmt.Println("サーバー起動 http://localhost:" + port + "/")
	e.Logger.Fatal(e.Start(":" + port))
}
