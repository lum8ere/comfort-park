package auth

import (
	"backed-api-v2/libs/2_generated_models/model"
	"backed-api-v2/libs/4_common/smart_context"
	"backed-api-v2/libs/4_common/types"
	"errors"
	"fmt"
	"time"

	"github.com/golang-jwt/jwt"
	"golang.org/x/crypto/bcrypt"
	"gorm.io/gorm"
)

func HandleLogin(sctx smart_context.ISmartContext, data map[string]interface{}) (interface{}, error) {
	email, ok := data["email"].(string)
	if !ok {
		return nil, fmt.Errorf("invalid or missing 'email'")
	}

	password, ok := data["password"].(string)
	if !ok {
		return nil, fmt.Errorf("invalid or missing 'password'")
	}

	var user model.User
	if err := sctx.GetDB().Where("email = ?", email).First(&user).Error; err != nil {
		if errors.Is(err, gorm.ErrRecordNotFound) {
			return nil, fmt.Errorf("неверные учетные данные")
		}
		sctx.Errorf("Ошибка при поиске пользователя", err)
		return nil, fmt.Errorf("внутренняя ошибка сервера")
	}

	if err := bcrypt.CompareHashAndPassword([]byte(user.Password), []byte(password)); err != nil {
		return nil, fmt.Errorf("неверные учетные данные")
	}

	token := jwt.NewWithClaims(jwt.SigningMethodHS256, jwt.MapClaims{
		"user_id": user.ID,
		"email":   user.Email,
		"role":    user.Role,
		"exp":     time.Now().Add(time.Hour * 3).Unix(), // Токен действителен 3 часа
	})

	tokenString, err := token.SignedString([]byte(sctx.GetDbManager().GetJwtSecret()))
	if err != nil {
		sctx.Errorf("Не удалось подписать JWT", err)
		return nil, fmt.Errorf("внутренняя ошибка сервера")
	}

	resp := types.LoginResponse{
		Token: tokenString,
	}

	return resp, nil
}
