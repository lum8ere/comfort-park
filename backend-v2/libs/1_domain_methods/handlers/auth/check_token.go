package auth

import (
	"backed-api-v2/libs/2_generated_models/model"
	"backed-api-v2/libs/4_common/smart_context"
	"fmt"
)

func CheckTokenHandler(sctx smart_context.ISmartContext, data map[string]interface{}) (interface{}, error) {
	userID, _ := sctx.GetContext().Value("user_id").(string)

	sctx.Debugf("userID: %v", userID)

	var user model.User
	if err := sctx.GetDB().First(&user, userID).Error; err != nil {
		sctx.Errorf("Ошибка при получении пользователя", err)
		return nil, fmt.Errorf("внутренняя ошибка сервера")
	}

	return map[string]interface{}{
		"user": user,
	}, nil
}
