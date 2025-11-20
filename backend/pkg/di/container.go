package di

type Container struct {
	Plant *PlantDi
	Auth  *AuthDI
}

func NewContainer() (*Container, error) {
	plant, err := NewPlantDi()
	if err != nil {
		return nil, err
	}

	auth, err := NewAuthDI()
	if err != nil {
		return nil, err
	}

	return &Container{
		Plant: plant,
		Auth:  auth,
	}, nil
}
