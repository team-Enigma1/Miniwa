package middleware

import (
	"fmt"
	"net/http"
	"strings"
	"time"

	"github.com/MicahParks/keyfunc/v2"
	"github.com/golang-jwt/jwt/v5"
	"github.com/labstack/echo/v4"
)

const UserIDContextKey = "user_id"

type JWTMiddleware struct {
	jwks   *keyfunc.JWKS
	issuer string
}

func NewJWTMiddleware(jwksURL, issuer, audience string) (*JWTMiddleware, error) {
	options := keyfunc.Options{
		RefreshErrorHandler: func(err error) {
			fmt.Printf("JWKS refresh error: %v\n", err)
		},
		RefreshInterval:   time.Hour,
		RefreshRateLimit:  time.Minute,
		RefreshTimeout:    10 * time.Second,
		RefreshUnknownKID: true,
	}

	jwks, err := keyfunc.Get(jwksURL, options)
	if err != nil {
		return nil, fmt.Errorf("failed to get JWKS from %s: %w", jwksURL, err)
	}

	return &JWTMiddleware{
		jwks:   jwks,
		issuer: issuer,
	}, nil
}

func (m *JWTMiddleware) MiddlewareFunc(next echo.HandlerFunc) echo.HandlerFunc {
	return func(c echo.Context) error {
		auth := c.Request().Header.Get("Authorization")
		if auth == "" {
			return c.JSON(http.StatusUnauthorized, map[string]string{"error": "missing authorization header"})
		}

		parts := strings.Fields(auth)
		if len(parts) != 2 || !strings.EqualFold(parts[0], "bearer") {
			return c.JSON(http.StatusUnauthorized, map[string]string{"error": "invalid authorization header"})
		}
		tokenString := parts[1]

		// Parse + verify token using JWKS
		token, err := jwt.Parse(tokenString, m.jwks.Keyfunc, jwt.WithValidMethods([]string{"RS256"}))
		if err != nil {
			return c.JSON(http.StatusUnauthorized, map[string]string{"error": "invalid token: " + err.Error()})
		}

		// Validate claims: issuer, audience, expiry, etc.
		if !token.Valid {
			return c.JSON(http.StatusUnauthorized, map[string]string{"error": "invalid token"})
		}

		claims, ok := token.Claims.(jwt.MapClaims)
		if !ok {
			return c.JSON(http.StatusUnauthorized, map[string]string{"error": "invalid token claims"})
		}

		//Verify issuer
		if m.issuer != "" {
			if iss, ok := claims["iss"].(string); !ok || iss != m.issuer {
				return c.JSON(http.StatusUnauthorized, map[string]string{"error": "invalid token issuer"})
			}
		}

		// Supabase user id is in "sub" claim (subject)
		sub, ok := claims["sub"].(string)
		if !ok || sub == "" {
			return c.JSON(http.StatusUnauthorized, map[string]string{"error": "invalid subject in token"})
		}

		// set user_id to context
		c.Set(UserIDContextKey, sub)

		// pass to next handler
		return next(c)
	}
}
