package di

import (
	"log"
	"os"

	"example.com/go-echo-crud/internal/handler"
	"example.com/go-echo-crud/internal/service"
	"github.com/supabase-community/supabase-go"
)

type AuthDI struct {
	Handler *handler.AuthHandler
}

func NewAuthDI() (*AuthDI, error) {

	url := os.Getenv("Project_URL")
	key := os.Getenv("Project_anon_key")

	if url == "" || key == "" {
		log.Println("Warning: Supabase env is missing")
	}

	client, err := supabase.NewClient(url, key, nil)
	if err != nil {
		return nil, err
	}

	authService := service.NewAuthService(client)
	authHandler := handler.NewAuthHandler(authService)

	return &AuthDI{
		Handler: authHandler,
	}, nil
}
