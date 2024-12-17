package buildings

import (
	"backed-api-v2/libs/2_generated_models/model"
	"backed-api-v2/libs/4_common/smart_context"
)

func GetBuildingsHandler(sctx smart_context.ISmartContext, data map[string]interface{}) (interface{}, error) {
	sctx.Info("Handling Buildings request")

	var buildings []model.Building
	sctx.Infof("db: %v", sctx.GetDB())
	if err := sctx.GetDB().Preload("Photos").Find(&buildings).Error; err != nil {
		sctx.Errorf("Failed to fetch buildings", err)
		return nil, err
	}

	sctx.Infof("Successfully fetched buildings", len(buildings))
	return buildings, nil
}
