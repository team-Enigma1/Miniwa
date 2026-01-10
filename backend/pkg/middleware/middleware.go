package middleware

import (
	"github.com/labstack/echo/v4"
    emw "github.com/labstack/echo/v4/middleware"
)

func Setup (e* echo.Echo) error {	
	e.Use(emw.Recover())
	e.Use(emw.Logger())
	e.Use(emw.CORSWithConfig(emw.CORSConfig{
    AllowOrigins: []string{
        "http://localhost:8080","http://10.0.2.2:8081","http://localhost:8081","http://localhost:8082",
    },
    AllowMethods: []string{echo.GET, echo.POST, echo.PUT, echo.DELETE},
    AllowHeaders: []string{echo.HeaderOrigin, echo.HeaderContentType, echo.HeaderAccept, "Authorization"},
    AllowCredentials: true, 
	}))
    e.Use(SupabaseJWT())

    return nil
}