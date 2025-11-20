package router

import (
	"example.com/go-echo-crud/internal/handler"
	"github.com/labstack/echo/v4"
)

func Setup(e *echo.Echo, handlers ...interface{}) {

	for _, h := range handlers {

		switch h := h.(type) {

		case *handler.PlantHandler:
			PlantRouter(e, h)

		case *handler.AuthHandler:
			AuthRouter(e, h)

		default:
			panic("unknown handler type: router not implemented")
		}
	}
}

// func LoginRouter(e *echo.Echo) {
// 	e.POST("/login", handler.LoginHandler)
// }

// func SignupRouter(e *echo.Echo) {
// 	e.POST("/signup", handler.SignupHandler)
// }
