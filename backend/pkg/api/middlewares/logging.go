package middlewares

import (
	"backed-api/pkg/context"
	"net/http"
	"time"

	"go.uber.org/zap"
)

func LoggingMiddleware(appCtx *context.AppContext) func(http.Handler) http.Handler {
	return func(next http.Handler) http.Handler {
		return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
			start := time.Now()
			next.ServeHTTP(w, r)
			duration := time.Since(start)

			appCtx.Logger.Info("Incoming request",
				zap.String("method", r.Method),
				zap.String("uri", r.RequestURI),
				zap.String("remote_addr", r.RemoteAddr),
				zap.Duration("duration", duration),
			)
		})
	}
}
