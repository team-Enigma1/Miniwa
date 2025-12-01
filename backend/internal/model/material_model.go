package model

type Soils struct {
	Rec_id int 
	Plant_id int 
	Desc	string 
	Sname string
	Url string
	Price int    
}

func (Soils) TableName() string {
	return  "plant_soil"
}

type Seeds struct {
	Seed_id int
	Seed_name string
	Url string
	Plant_id int
	Desc string
	Price int
}

func (Seeds) TableName() string {
    return "seeds" 
}

type Fertilizers struct {
	Fertilizer_id int
	Fname string
	Fertilizer_form []byte
	Npk_ratio string
	Usage_frequency int
	Plant_id int
	Growth_id int
	Price int
} 

func (Fertilizers) TableName() string {
    return "fertilizer_type" 
}