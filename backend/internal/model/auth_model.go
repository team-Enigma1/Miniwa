package model

type AuthRequest struct {
	Email    string `json:"email"`
	Password string `json:"password"`
}

type GoogleLoginRequest struct {
	Token string `json:"token"`
}
