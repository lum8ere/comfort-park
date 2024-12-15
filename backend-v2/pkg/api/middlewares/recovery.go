package middlewares

import (
	"net/http"
	"runtime/debug"

	"go.uber.org/zap"
)

func RecoveryMiddleware(log *zap.Logger) func(next http.Handler) http.Handler {
	return func(next http.Handler) http.Handler {
		return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
			defer func() {
				if err := recover(); err != nil {
					log.Error("Panic recovered",
						zap.Any("error", err),
						zap.String("stack", string(debug.Stack())),
					)
					http.Error(w, http.StatusText(http.StatusInternalServerError), http.StatusInternalServerError)
				}
			}()
			next.ServeHTTP(w, r)
		})
	}
}
