package main

import (
	"fmt"
	"log"

	"example.com/go-echo-crud/internal/infra/cron"
	"example.com/go-echo-crud/pkg/di"
	"example.com/go-echo-crud/pkg/middleware"
	"example.com/go-echo-crud/pkg/router"
	"github.com/labstack/echo/v4"
)

func main() {

	e := echo.New()

	middleware.Setup(e)

	// public
	e.Static("/images", "images")
	e.File("/favicon.ico", "static/favicon.ico")

	// protected
	api := e.Group("/api")
	api.Use(middleware.SupabaseJWT())

	container, err := di.NewContainer()
	if err != nil {
		log.Fatal(err)
	}

	cron.Start(container.TodosService)

	router.Setup(api, container)

	port := "8080"
	fmt.Println("サーバー起動 http://localhost:" + port + "/")
	e.Logger.Fatal(e.Start(":" + port))
}
