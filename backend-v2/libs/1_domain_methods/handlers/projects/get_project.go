package projects

import (
	"backed-api-v2/libs/2_generated_models/model"
	"backed-api-v2/libs/4_common/smart_context"
	"fmt"
)

func GetProjectsByIDHandler(sctx smart_context.ISmartContext, data map[string]interface{}) (interface{}, error) {
	sctx.Info("Handling Projects by id request")

	// Извлекаем параметр 'id' из URL
	id, ok := data["id"]
	if !ok {
		return nil, fmt.Errorf("invalid or missing 'id'")
	}

	sctx.Infof("Handling Projects by id request", id)
	if id == "" {
		sctx.Warn("ID parameter is missing")
		return map[string]string{"error": "ID parameter is missing"}, nil
	}

	// Получаем данные из базы данных
	var project model.Project
	if err := sctx.GetDB().Preload("ProjectPhoto").Preload("ProjectReview").Where("id = ?", id).Find(&project).Error; err != nil {
		sctx.Errorf("Failed to fetch projects", err)
		return nil, err
	}

	sctx.Info("Successfully fetched projects by id")
	return project, nil
}
