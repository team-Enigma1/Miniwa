package model

type Weather struct {
	City string  `json:"city"`
	Temp float64 `json:"temp"`
	Icon string  `json:"icon"`
}
