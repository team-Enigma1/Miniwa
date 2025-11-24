package model

type Soils struct {
	Rec_id int 
	Plant_id int 
	Desc	string 
	Sname string
	Url string
	Price int    
}

type Seeds struct {
	Seed_id int8 
	Seed_name string
	Url string
	Plant_id int
	Desc string
	Price int
}

type Fertilizers struct {
	Fertilizer_id int8
	Fname string
	Fertilizer_form []byte
	Npk_ratio string
	Usage_frequency int
	Plant_id int8
	Growth_id int8
	Prize int

} 