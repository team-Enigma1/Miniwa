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

func (h *UserHandler) GetUserData(c echo.Context) error {
	var req GetUserRequest

	if err := c.Bind(&req); err != nil {
		return c.JSON(http.StatusBadRequest, map[string]string{
			"error": err.Error(),
		})
	}

	user, err := h.userService.GetUserData(req.UserID)
	if err != nil {
		return c.JSON(http.StatusNotFound, map[string]string{
			"error": "User not found",
		})
	}

	return c.JSON(http.StatusOK, user)
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

func (h *UserHandler) RegisterUserPlant(c echo.Context) error {
	var req model.UserPlant

	if err := c.Bind(&req); err != nil {
		return c.JSON(http.StatusBadRequest, map[string]string{
			"error": err.Error(),
		})
	}

	plant := &model.UserPlant{
		UserID:   req.UserID,
		PlantID:  req.PlantID,
		GrowthID: 1001,
	}

	newPlant, err := h.userService.RegisterUserPlant(plant)
	if err != nil {
		return c.JSON(http.StatusInternalServerError, map[string]string{
			"error": err.Error(),
		})
	}

	return c.JSON(http.StatusCreated, newPlant)
}
