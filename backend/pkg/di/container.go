package di

type Container struct {
	Plant *PlantDi
}

func NewContainer() (*Container, error) {
	plant, err := NewPlantDi()
	if err != nil {
		return nil, err
	}

	return &Container{
		Plant: plant,
	}, nil
}