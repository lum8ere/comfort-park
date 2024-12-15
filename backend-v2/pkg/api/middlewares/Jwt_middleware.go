package middlewares

import (
	"backed-api/pkg/context"
	"encoding/json"
	"errors"
	"net/http"
	"strings"

	"github.com/golang-jwt/jwt"
)

// UserClaims представляет кастомные claims для JWT
type UserClaims struct {
	UserID uint   `json:"user_id"`
	Email  string `json:"email"`
	Role   string `json:"role"`
	jwt.StandardClaims
}

// JWTMiddleware возвращает middleware, который проверяет JWT-токен
func JWTMiddleware(appCtx *context.AppContext) func(http.Handler) http.Handler {
	return func(next http.Handler) http.Handler {
		return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
			authHeader := r.Header.Get("Authorization")
			if authHeader == "" {
				respondWithError(w, "Authorization header missing", http.StatusUnauthorized)
				return
			}

			parts := strings.SplitN(authHeader, " ", 2)
			if len(parts) != 2 || strings.ToLower(parts[0]) != "bearer" {
				respondWithError(w, "Invalid Authorization header format", http.StatusUnauthorized)
				return
			}

			tokenStr := parts[1]
			claims := &UserClaims{}

			token, err := jwt.ParseWithClaims(tokenStr, claims, func(token *jwt.Token) (interface{}, error) {
				if _, ok := token.Method.(*jwt.SigningMethodHMAC); !ok {
					return nil, errors.New("unexpected signing method")
				}
				return []byte(appCtx.Config.JWTSecret), nil
			})

			if err != nil || !token.Valid {
				respondWithError(w, "Invalid token", http.StatusUnauthorized)
				return
			}

			// // Добавляем информацию о пользователе в контекст
			contextWithUser(appCtx, claims.UserID, claims.Email, claims.Role)

			next.ServeHTTP(w, r)
		})
	}
}

// respondWithError отправляет ошибку в формате JSON
func respondWithError(w http.ResponseWriter, message string, code int) {
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(code)
	json.NewEncoder(w).Encode(map[string]string{"error": message})
}

// contextKey используется для хранения данных в контексте
type contextKey string

const userContextKey = contextKey("user")

// UserInfo содержит информацию о пользователе
type UserInfo struct {
	UserID uint
	Email  string
	Role   string
}

// contextWithUser добавляет информацию о пользователе в контекст
func contextWithUser(appCtx *context.AppContext, userID uint, email, role string) {
	user := UserInfo{
		UserID: userID,
		Email:  email,
		Role:   role,
	}

	appCtx.WithValue(userContextKey, user)
}

func GetUserFromContext(appCtx *context.AppContext) (*UserInfo, bool) {
	user, ok := appCtx.Value(userContextKey).(UserInfo)
	if !ok {
		return nil, false
	}
	return &user, true
}
