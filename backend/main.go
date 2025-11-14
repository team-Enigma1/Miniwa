package main

import (
	"fmt"

	"example.com/go-echo-crud/internal/infra"
	"example.com/go-echo-crud/pkg/middleware"
	"example.com/go-echo-crud/pkg/router"
	"github.com/labstack/echo/v4"
)

func main() {

	gorm.InitDB()

	e := echo.New()

	middleware.Setup(e)

	// Setup routes
	router.Setup(e)
	// router.LoginRouter(e)
	// router.SignupRouter(e)

	port := "3000"
	fmt.Println("サーバー起動 http://localhost:" + port + "/")
	e.Logger.Fatal(e.Start(":" + port))
}
