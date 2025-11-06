package main

import (
	"fmt"
	"os"

	"example.com/go-echo-crud/pkg/router"
	"github.com/labstack/echo/v4"
)

func main() {
	e := echo.New()
	
	//routeまとめてるとこ読み込み
	router.Setup(e)

	port := os.Getenv("PORT")
	if port == "" {
		port = "8080"
	}

	fmt.Println("サーバー起動 http://localhost:" + port + "/")
	e.Logger.Fatal(e.Start(":" + port))
}
