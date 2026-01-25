package handler

import (
	"net/http"
	"strconv"

	model "example.com/go-echo-crud/internal/model"
	"example.com/go-echo-crud/internal/service"
	"github.com/labstack/echo/v4"
)

type RecordHandler struct {
	recordService service.IRecordService
}

func NewRecordHandler(recordService service.IRecordService) *RecordHandler {
	return &RecordHandler{recordService: recordService}
}

func (h *RecordHandler) GetPlantRecord(c echo.Context) error {
	userID, ok := c.Get("user_id").(string)
	if !ok || userID == "" {
		return echo.NewHTTPError(http.StatusUnauthorized, "unauthorized")
	}

	userPlantID, err := strconv.Atoi(c.Param("user_plant_id"))
	if err != nil || userPlantID <= 0 {
		return echo.NewHTTPError(http.StatusBadRequest, "invalid plant id")
	}

	records, err := h.recordService.GetPlantRecord(userID, userPlantID)
	if err != nil {
		return echo.NewHTTPError(http.StatusInternalServerError, err.Error())
	}

	return c.JSON(http.StatusOK, records)
}

func (h *RecordHandler) CreatePlantRecord(c echo.Context) error {
	userID, ok := c.Get("user_id").(string)
	if !ok || userID == "" {
		return echo.NewHTTPError(http.StatusUnauthorized, "unauthorized")
	}

	var req model.Records
	if err := c.Bind(&req); err != nil {
		return c.JSON(http.StatusBadRequest, echo.Map{
			"message": "invalid request",
		})
	}

	req.UserID = userID

	record, err := h.recordService.CreatePlantRecord(&req)
	if err != nil {
		return c.JSON(http.StatusInternalServerError, echo.Map{
			"message": err.Error(),
		})
	}

	return c.JSON(http.StatusCreated, echo.Map{
		"data": record,
	})
}

func (h *RecordHandler) UpdatePlantRecord(c echo.Context) error {
	userID, ok := c.Get("user_id").(string)
	if !ok || userID == "" {
		return echo.NewHTTPError(http.StatusUnauthorized, "unauthorized")
	}

	recordID, err := strconv.Atoi(c.Param("id"))
	if err != nil {
		return c.JSON(http.StatusBadRequest, echo.Map{
			"message": "invalid record id",
		})
	}

	var req model.Records
	if err := c.Bind(&req); err != nil {
		return c.JSON(http.StatusBadRequest, echo.Map{
			"message": "invalid request",
		})
	}

	record, err := h.recordService.UpdatePlantRecord(userID, recordID, &req)
	if err != nil {
		return c.JSON(http.StatusBadRequest, echo.Map{
			"message": err.Error(),
		})
	}

	return c.JSON(http.StatusOK, echo.Map{
		"data": record,
	})
}

func (h *RecordHandler) DeletePlantRecord(c echo.Context) error {
	userID, ok := c.Get("user_id").(string)
	if !ok || userID == "" {
		return echo.NewHTTPError(http.StatusUnauthorized, "unauthorized")
	}

	recordID, err := strconv.Atoi(c.Param("id"))
	if err != nil {
		return c.JSON(http.StatusBadRequest, echo.Map{
			"message": "invalid record id",
		})
	}

	if err := h.recordService.DeletePlantRecord(userID, recordID); err != nil {
		return c.JSON(http.StatusInternalServerError, echo.Map{
			"message": err.Error(),
		})
	}

	return c.JSON(http.StatusOK, echo.Map{
		"message": "record deleted",
	})
}
