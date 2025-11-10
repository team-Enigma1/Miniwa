package main

import (
	"fmt"

	database "example.com/go-echo-crud/internal/infra"
	"example.com/go-echo-crud/pkg/router"
	"github.com/labstack/echo/v4"
)

func main() {
	e := echo.New()

	// Inisialisasi koneksi database
	database.InitDB()

	// Setup routes
	router.Setup(e)

	port := "8080"
	fmt.Println("サーバー起動 http://localhost:" + port + "/")
	e.Logger.Fatal(e.Start(":" + port))
}
