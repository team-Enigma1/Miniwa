package main

import (
	"fmt"

	"example.com/go-echo-crud/pkg/di"
	"example.com/go-echo-crud/pkg/middleware"
	"example.com/go-echo-crud/pkg/router"
	"github.com/labstack/echo/v4"
)

func main() {


	e := echo.New()

	container, _ := di.NewContainer()


	middleware.Setup(e)

	// Setup routes
	router.Setup(e,container)

	// service.SignupWithEmail("ranyanastasia15@gmail.com", "Enigma12345")

	port := "8080"
	fmt.Println("サーバー起動 http://localhost:" + port + "/")
	e.Logger.Fatal(e.Start(":" + port))
}
