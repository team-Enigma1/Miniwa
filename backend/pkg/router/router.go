package router

import (
	"example.com/go-echo-crud/internal/handler"
	"github.com/labstack/echo/v4"
)

func Setup(e *echo.Echo) {
	//各モジュールのルーティング関数呼び出し
	PlantRouter(e)
}

func LoginRouter(e *echo.Echo) {
	e.POST("/login", handler.LoginHandler)
}

func SignupRouter(e *echo.Echo) {
	e.POST("/signup", handler.SignupHandler)
}
