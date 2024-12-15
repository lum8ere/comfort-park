package middlewares

import (
	"backed-api/libs/4_common/smart_context"
	"net/http"
)

func LoggingMiddleware(sctx smart_context.ISmartContext) func(http.Handler) http.Handler {
	return func(next http.Handler) http.Handler {
		return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
			// start := time.Now()
			next.ServeHTTP(w, r)
			// duration := time.Since(start)

			sctx.Info("Incoming request")
		})
	}
}
