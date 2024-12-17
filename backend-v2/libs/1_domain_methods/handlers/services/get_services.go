package services

import (
	"backed-api-v2/libs/2_generated_models/model"
	"backed-api-v2/libs/4_common/smart_context"
)

func GetServicesHandler(sctx smart_context.ISmartContext, data map[string]interface{}) (interface{}, error) {
	sctx.Info("Handling Service request")

	var services []model.Service
	if err := sctx.GetDB().Find(&services).Error; err != nil {
		sctx.Errorf("Failed to fetch services: %v", err)
		return nil, err
	}

	sctx.Infof("Successfully fetched services, count: %v", len(services))
	return services, nil
}
