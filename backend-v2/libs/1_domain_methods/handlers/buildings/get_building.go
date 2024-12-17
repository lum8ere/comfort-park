package buildings

import (
	"backed-api-v2/libs/2_generated_models/model"
	"backed-api-v2/libs/4_common/smart_context"
	"fmt"
)

func GetBuildingByIDHandler(sctx smart_context.ISmartContext, data map[string]interface{}) (interface{}, error) {
	sctx.Info("Handling Building by id request")

	sctx.Infof("data: %v", data)

	id, ok := data["id"]
	if !ok {
		return nil, fmt.Errorf("invalid or missing 'id'")
	}
	sctx.Infof("Handling Building by %v request", id)

	var building model.Building
	if err := sctx.GetDB().Preload("Photos").Where("id = ?", id).Find(&building).Error; err != nil {
		sctx.Errorf("Failed to fetch building: %v", err)
		return nil, err
	}

	sctx.Infof("Successfully fetched building by %v", building.ID)
	return building, nil
}
