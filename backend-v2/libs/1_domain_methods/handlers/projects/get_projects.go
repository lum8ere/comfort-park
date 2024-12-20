package projects

import (
	"backed-api-v2/libs/2_generated_models/model"
	"backed-api-v2/libs/4_common/smart_context"
)

func GetProjectsHandler(sctx smart_context.ISmartContext, data map[string]interface{}) (interface{}, error) {
	sctx.Info("Handling Projects request")

	// Получаем данные из базы данных
	var projects []model.Project
	if err := sctx.GetDB().Preload("ProjectPhoto").Preload("ProjectReview").Find(&projects).Error; err != nil {
		sctx.Errorf("Failed to fetch projects", err)
		return nil, err
	}

	sctx.Infof("Successfully fetched projects", len(projects))
	return projects, nil
}
