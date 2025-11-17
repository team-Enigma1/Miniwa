package handler

import (
	"net/http"

	model "example.com/go-echo-crud/internal/model"
	service "example.com/go-echo-crud/internal/service"
	"github.com/labstack/echo/v4"
)

func LoginHandler(c echo.Context) error {
	// Handle login request
	var req model.AuthRequest

	// Parse JSON body
	if err := c.Bind(&req); err != nil {
		return c.JSON(http.StatusBadRequest, map[string]string{"error": "Invalid JSON"})
	}

	// Service login
	user, err := service.LoginWithEmail(req.Email, req.Password)
	if err != nil {
		return c.JSON(http.StatusBadRequest, map[string]string{"error": err.Error()})
	}

	return c.JSON(http.StatusOK, user)
}

func SignupHandler(c echo.Context) error {
	// Handle signup request
	var req model.AuthRequest

	if err := c.Bind(&req); err != nil {
		return c.JSON(http.StatusBadRequest, map[string]string{"error": "Invalid JSON"})
	}

	user, err := service.SignupWithEmail(req.Email, req.Password)
	if err != nil {
		return c.JSON(http.StatusBadRequest, map[string]string{"error": err.Error()})
	}

	return c.JSON(http.StatusOK, user)
}

func GoogleLoginHandler(c echo.Context) error {
	var req model.GoogleLoginRequest
	if err := c.Bind(&req); err != nil {
		return c.JSON(http.StatusBadRequest, map[string]string{"error": "Invalid JSON"})
	}

	user, err := service.GoogleSignIn(req.Token)
	if err != nil {
		return c.JSON(http.StatusInternalServerError, map[string]string{"error": err.Error()})
	}

	return c.JSON(http.StatusOK, user)
}
