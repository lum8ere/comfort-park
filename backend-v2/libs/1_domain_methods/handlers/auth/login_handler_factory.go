package auth

import (
	"backed-api-v2/libs/4_common/smart_context"
	"fmt"
	"net/http"
	"strings"

	"github.com/golang-jwt/jwt"
)

func JWTMiddleware(sctx smart_context.ISmartContext) func(http.Handler) http.Handler {
	return func(next http.Handler) http.Handler {
		return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
			authHeader := r.Header.Get("Authorization")
			if authHeader == "" {
				http.Error(w, "Missing Authorization header", http.StatusUnauthorized)
				return
			}

			// Заголовок обычно вида: "Authorization: Bearer <token>"
			parts := strings.SplitN(authHeader, " ", 2)
			if len(parts) != 2 || strings.ToLower(parts[0]) != "bearer" {
				http.Error(w, "Invalid Authorization format", http.StatusUnauthorized)
				return
			}

			tokenStr := parts[1]

			// Парсим токен
			token, err := jwt.Parse(tokenStr, func(token *jwt.Token) (interface{}, error) {
				// Проверяем метод подписи:
				if _, ok := token.Method.(*jwt.SigningMethodHMAC); !ok {
					return nil, fmt.Errorf("unexpected signing method: %v", token.Header["alg"])
				}
				// Возвращаем секретный ключ для валидации подписи
				return []byte(sctx.GetDbManager().GetJwtSecret()), nil
			})

			if err != nil || !token.Valid {
				http.Error(w, "Invalid token", http.StatusUnauthorized)
				return
			}

			claims, ok := token.Claims.(jwt.MapClaims)
			if !ok {
				http.Error(w, "Invalid token claims", http.StatusUnauthorized)
				return
			}

			// Из claims можно вытащить user_id, email, role
			userID, _ := claims["user_id"].(string)
			email, _ := claims["email"].(string)
			role, _ := claims["role"].(string)

			// При желании можно сохранить эти данные в контексте
			sctxWithUser := sctx.WithFields(map[string]interface{}{
				"user_id": userID,
				"email":   email,
				"role":    role,
			})

			// Пробрасываем обновлённый контекст дальше
			next.ServeHTTP(w, r.WithContext(sctxWithUser.GetContext()))
		})
	}
}
