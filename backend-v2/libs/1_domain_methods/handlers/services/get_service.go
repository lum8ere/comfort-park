package services

import (
	"backed-api-v2/libs/2_generated_models/model"
	"backed-api-v2/libs/4_common/smart_context"
	"fmt"
)

func GetServiceByIDHandler(sctx smart_context.ISmartContext, data map[string]interface{}) (interface{}, error) {
	sctx.Info("Handling service by id request")

	// Извлекаем параметр 'id' из URL
	id, ok := data["id"]
	if !ok {
		return nil, fmt.Errorf("invalid or missing 'id'")
	}

	// Получаем данные из базы данных
	var service model.Service
	if err := sctx.GetDB().Where("id = ?", id).Find(&service).Error; err != nil {
		sctx.Errorf("Failed to fetch service: ", err)
		return nil, err
	}

	sctx.Infof("Successfully fetched service by %v", service.ID)
	return service, nil
}
