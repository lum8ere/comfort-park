package middlewares

// import (
// 	"backed-api/pkg/api/handlers"
// 	"backed-api/pkg/context"
// 	"encoding/json"
// 	"net/http"

// 	"go.uber.org/zap"
// )

// func JSONResponseMiddleware(handler handlers.AppHandler, appCtx *context.AppContext) http.HandlerFunc {
// 	return func(w http.ResponseWriter, r *http.Request) {
// 		data, err := handler(appCtx, r)
// 		if err != nil {
// 			handleError(w, err, appCtx.Logger)
// 			return
// 		}

// 		w.Header().Set("Content-Type", "application/json")
// 		if data != nil {
// 			if err := json.NewEncoder(w).Encode(data); err != nil {
// 				appCtx.Logger.Error("Failed to encode JSON response", zap.Error(err))
// 				http.Error(w, "Internal Server Error", http.StatusInternalServerError)
// 			}
// 		} else {
// 			w.WriteHeader(http.StatusNoContent)
// 		}
// 	}
// }

// func handleError(w http.ResponseWriter, err error, log *zap.Logger) {
// 	// Обработка ошибок
// 	log.Error("Handler error", zap.Error(err))
// 	w.Header().Set("Content-Type", "application/json")
// 	w.WriteHeader(http.StatusInternalServerError)
// 	json.NewEncoder(w).Encode(map[string]string{"error": err.Error()})
// }
