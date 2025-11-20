package service

import (
	"github.com/supabase-community/gotrue-go/types"
	"github.com/supabase-community/supabase-go"
)

type IAuthService interface {
	Login(email, password string) (*types.TokenResponse, error)
	Signup(email, password string) (*types.SignupResponse, error)
}

type AuthService struct {
	client *supabase.Client
}

func NewAuthService(client *supabase.Client) *AuthService {
	return &AuthService{client: client}
}

func (s *AuthService) Login(email, password string) (*types.TokenResponse, error) {
	user, err := s.client.Auth.SignInWithEmailPassword(email, password)
	if err != nil {
		return nil, err
	}
	return user, nil
}

func (s *AuthService) Signup(email, password string) (*types.SignupResponse, error) {
	req := types.SignupRequest{
		Email:    email,
		Password: password,
	}

	user, err := s.client.Auth.Signup(req)
	if err != nil {
		return nil, err
	}

	return user, nil
}
