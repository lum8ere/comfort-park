package buildings

import (
	"backed-api-v2/libs/2_generated_models/model"
	"backed-api-v2/libs/4_common/smart_context"
	"fmt"
)

func DeleteBuildingHandler(sctx smart_context.ISmartContext, data map[string]interface{}) (interface{}, error) {
	id, _ := data["id"].(string)
	if id == "" {
		return map[string]string{"error": "ID parameter is missing"}, nil
	}

	var building model.Building
	if err := sctx.GetDB().Where("id = ?", id).First(&building).Error; err != nil {
		sctx.Warnf("Building not found: %v", err)
		return map[string]string{"error": "Building not found"}, nil
	}

	if err := sctx.GetDB().Delete(&building).Error; err != nil {
		sctx.Errorf("Failed to delete building: %v", err)
		return nil, fmt.Errorf("failed to delete building")
	}

	return map[string]string{"message": "Building deleted successfully"}, nil
}
