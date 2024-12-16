package handlers

// import (
// 	"backed-api/pkg/context"
// 	"backed-api/pkg/db/model"
// 	"encoding/json"
// 	"errors"
// 	"fmt"
// 	"net/http"
// 	"time"

// 	"github.com/golang-jwt/jwt"
// 	"go.uber.org/zap"
// 	"golang.org/x/crypto/bcrypt"
// 	"gorm.io/gorm"
// )

// type LoginRequest struct {
// 	Email    string `json:"email"`
// 	Password string `json:"password"`
// }

// // LoginResponse представляет структуру ответа при успешном логине
// type LoginResponse struct {
// 	Token string `json:"token"`
// }

// func HandleLogin(appCtx *context.AppContext, r *http.Request) (interface{}, error) {
// 	var req LoginRequest

// 	// Декодирование JSON тела запроса
// 	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
// 		return nil, fmt.Errorf("неверный формат запроса")
// 	}

// 	// Поиск пользователя по email
// 	var user model.User
// 	if err := appCtx.DB.Where("email = ?", req.Email).First(&user).Error; err != nil {
// 		if errors.Is(err, gorm.ErrRecordNotFound) {
// 			return nil, fmt.Errorf("неверные учетные данные")
// 		}
// 		appCtx.Logger.Error("Ошибка при поиске пользователя", zap.Error(err))
// 		return nil, fmt.Errorf("внутренняя ошибка сервера")
// 	}

// 	// Сравнение паролей
// 	if err := bcrypt.CompareHashAndPassword([]byte(user.Password), []byte(req.Password)); err != nil {
// 		return nil, fmt.Errorf("неверные учетные данные")
// 	}

// 	// Создание JWT-токена
// 	token := jwt.NewWithClaims(jwt.SigningMethodHS256, jwt.MapClaims{
// 		"user_id": user.ID,
// 		"email":   user.Email,
// 		"role":    user.Role,
// 		"exp":     time.Now().Add(time.Hour * 3).Unix(), // Токен действителен 3 часа
// 	})

// 	tokenString, err := token.SignedString([]byte(appCtx.Config.JWTSecret))
// 	if err != nil {
// 		appCtx.Logger.Error("Не удалось подписать JWT", zap.Error(err))
// 		return nil, fmt.Errorf("внутренняя ошибка сервера")
// 	}

// 	// Формирование ответа
// 	resp := LoginResponse{
// 		Token: tokenString,
// 	}

// 	return resp, nil
// }

// // UserInfo представляет информацию о пользователе, извлеченную из токена
// type UserInfo struct {
// 	UserID uint   `json:"user_id"`
// 	Email  string `json:"email"`
// 	Role   string `json:"role"`
// }

// // handleMe возвращает информацию о текущем пользователе
// func handleMe(appCtx *context.AppContext, r *http.Request) (interface{}, error) {
// 	// user, ok := GetUserFromContext(appCtx)
// 	// if !ok {
// 	// 	return nil, errors.New("пользователь не найден в контексте")
// 	// }

// 	// Можно дополнительно загрузить данные пользователя из базы данных, если необходимо
// 	// Например:
// 	/*
// 	   var userDetails storage.User
// 	   if err := appCtx.DB.First(&userDetails, user.UserID).Error; err != nil {
// 	       return nil, errors.New("не удалось загрузить данные пользователя")
// 	   }
// 	*/

// 	return nil, nil
// }
