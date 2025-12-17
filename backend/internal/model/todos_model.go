package model

type Todos struct {
	Id 					string		`json:"id"`
	User_plant_id 		int 		`json:"user_plant_id"`
	Water 				bool		`json:"water"`
	Water_count 		int8		`json:"water_count"`
	Fertilizer 			bool		`json:"fertilizer"`
}

type UpdeteUserTodo struct {
	User_plant_id	int 		`json:"user_plant_id"`
	Water_count		*int8		`json:"water_count"`
	Fertilizer		*bool		`json:"fertilizer"`
}