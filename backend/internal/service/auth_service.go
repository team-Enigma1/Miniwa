package service

import (
	"fmt"
	"log"
	"os"

	"github.com/joho/godotenv"
	"github.com/supabase-community/gotrue-go/types"
	"github.com/supabase-community/supabase-go"
)

var supabaseUrl string
var supabaseKey string

func Init() {
	err := godotenv.Load("config/.env")
	if err != nil {
		log.Println("Warning: .env file not found")
	}

	supabaseUrl = os.Getenv("Project_URL")
	supabaseKey = os.Getenv("Project_anon_key")
}

// Login(Sign in) with email and password
func LoginWithEmail(email, password string) (*types.TokenResponse, error) {
	client, err := supabase.NewClient(supabaseUrl, supabaseKey, nil)
	if err != nil {
		log.Fatalf("Cannot initialize Supabase client: %v", err)
	}

	user, err := client.Auth.SignInWithEmailPassword(email, password)
	if err != nil {
		log.Fatalf("Login error: %v", err)
	}

	fmt.Println("Login success:", user)

	return user, nil
}

// Signup(Register) with email and password
func SignupWithEmail(email, password string) (*types.SignupResponse, error) {
	client, err := supabase.NewClient(supabaseUrl, supabaseKey, nil)
	if err != nil {
		log.Fatalf("Cannot initialize Supabase client: %v", err)
	}

	req := types.SignupRequest{
		Email:    email,
		Password: password,
	}

	user, err := client.Auth.Signup(req)
	if err != nil {
		log.Fatalf("Signup error: %v", err)
	}

	fmt.Println("Signup success:", user)

	return user, nil
}
