package middleware

import (
	"net/http"
	"os"
	"strings"

	"github.com/golang-jwt/jwt/v4"
	"github.com/labstack/echo/v4"
)

func SupabaseJWT() echo.MiddlewareFunc {
	jwtSecret := os.Getenv("SUPABASE_JWT_SECRET")
	if jwtSecret == "" {
		panic("SUPABASE_JWT_SECRET is not set")
	}

	return func(next echo.HandlerFunc) echo.HandlerFunc {
		return func(c echo.Context) error {
			auth := c.Request().Header.Get("Authorization")
			if auth == "" {
				return echo.NewHTTPError(http.StatusUnauthorized, "missing authorization header")
			}

			parts := strings.Split(auth, " ")
			if len(parts) != 2 || parts[0] != "Bearer" {
				return echo.NewHTTPError(http.StatusUnauthorized, "invalid authorization format")
			}

			tokenStr := parts[1]

			token, err := jwt.Parse(tokenStr, func(token *jwt.Token) (interface{}, error) {
				// pastikan HS256
				if _, ok := token.Method.(*jwt.SigningMethodHMAC); !ok {
					return nil, echo.NewHTTPError(http.StatusUnauthorized, "unexpected signing method")
				}
				return []byte(jwtSecret), nil
			})

			if err != nil || !token.Valid {
				return echo.NewHTTPError(http.StatusUnauthorized, "invalid or expired token")
			}

			claims, ok := token.Claims.(jwt.MapClaims)
			if !ok {
				return echo.NewHTTPError(http.StatusUnauthorized, "invalid token claims")
			}

			// optional: cek issuer
			iss, ok := claims["iss"].(string)
			if !ok || !strings.Contains(iss, "supabase") {
				return echo.NewHTTPError(http.StatusUnauthorized, "invalid issuer")
			}

			// simpan user info ke context

			userID, ok := claims["sub"].(string)
			if !ok || userID == "" {
				return echo.NewHTTPError(http.StatusUnauthorized, "invalid user id in token")
			}

			c.Set("user_id", userID)
			c.Set("claims", claims)

			return next(c)
		}
	}
}
