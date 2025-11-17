package router

import (
	"net/http"

	"github.com/labstack/echo/v4"
)

func Setup(e *echo.Echo) {
	//testでハローワールド置いてる
	e.GET("/", func(c echo.Context) error {
		return c.String(http.StatusOK, "Hello, Echo! (from router)")
	})

	//各モジュールのルーティング関数呼び出し
	//TestRouter(e)
	//TestRouter2(e)

	RegisterAuthRoutes(e)
}
