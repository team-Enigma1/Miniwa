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
	router.Setup(e, container.Plant.Handler)
	// router.LoginRouter(e)
	// router.SignupRouter(e)

	port := "3000"
	fmt.Println("サーバー起動 http://localhost:" + port + "/")
	e.Logger.Fatal(e.Start(":" + port))
}
