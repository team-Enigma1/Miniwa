package handler

import (
	"net/http"

	"example.com/go-echo-crud/internal/model"
	"example.com/go-echo-crud/internal/service"
	"github.com/labstack/echo/v4"
)

type UserHandler struct {
	userService service.IUserService
}

type GetUserRequest struct {
	UserID string `json:"user_id"`
}

func NewUserHandler(userService service.IUserService) *UserHandler {
	return &UserHandler{userService: userService}
}

func (h *UserHandler) RegisterUserPlant(c echo.Context) error {
	var req model.UserPlant

	if err := c.Bind(&req); err != nil {
		return c.JSON(http.StatusBadRequest, map[string]string{
			"error": err.Error(),
		})
	}

	userID, ok := c.Get("user_id").(string)
	if !ok || userID == "" {
		return c.JSON(http.StatusUnauthorized, echo.Map{
			"error": "unauthorized",
		})
	}

	req.UserID = userID

	result, err := h.userService.RegisterUserPlant(&req)
	if err != nil {
		return c.JSON(http.StatusInternalServerError, map[string]string{
			"error": err.Error(),
		})
	}

	return c.JSON(http.StatusOK, echo.Map{
		"success": true,
		"data":    result,
	})
}

func (h *UserHandler) GetUserData(c echo.Context) error {
	userID, ok := c.Get("user_id").(string)
	if !ok || userID == "" {
		return c.JSON(http.StatusUnauthorized, echo.Map{
			"error": "unauthorized",
		})
	}

	return c.JSON(http.StatusOK, echo.Map{
		"user_id": userID,
	})
}

func (h *UserHandler) UpdateUserData(c echo.Context) error {
	var req model.User

	if err := c.Bind(&req); err != nil {
		return c.JSON(http.StatusBadRequest, map[string]string{
			"error": err.Error(),
		})
	}

	updatedUser, err := h.userService.UpdateUserData(req.UserID, &model.User{
		Username:    req.Username,
		ProfileImg:  req.ProfileImg,
		Description: req.Description,
	})

	if err != nil {
		return c.JSON(http.StatusInternalServerError, map[string]string{
			"error": err.Error(),
		})
	}

	return c.JSON(http.StatusOK, updatedUser)
}
