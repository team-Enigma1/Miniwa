package main

import (
	"fmt"
	"log"

	"example.com/go-echo-crud/pkg/di"
	"example.com/go-echo-crud/pkg/middleware"
	"example.com/go-echo-crud/pkg/router"
	"github.com/labstack/echo/v4"
)

func main() {


	e := echo.New()

	container, err := di.NewContainer()
    if err != nil {
        log.Fatal(err)
    }


	middleware.Setup(e)

	// Setup routes
	router.Setup(e)

	// service.SignupWithEmail("ranyanastasia15@gmail.com", "Enigma12345")

	port := "8080"
	fmt.Println("サーバー起動 http://localhost:" + port + "/")
	e.Logger.Fatal(e.Start(":" + port))
}
