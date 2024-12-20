package run_processor

import (
	"backed-api-v2/libs/4_common/smart_context"
	"encoding/json"
	"errors"
	"net/http"
	"strconv"

	"github.com/go-chi/chi/v5"
	"go.uber.org/zap"
)

type AppHandler func(sctx smart_context.ISmartContext, data map[string]interface{}) (interface{}, error)

func JSONResponseMiddleware(sctx smart_context.ISmartContext, handler AppHandler) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		var data map[string]interface{}
		var err error

		// Определяем метод запроса и парсим параметры
		switch r.Method {
		case http.MethodGet:
			data, err = parseGetParams(sctx, r)
		case http.MethodPost, http.MethodPut, http.MethodDelete:
			data, err = parseFormParams(r)
		default:
			http.Error(w, "Method Not Allowed", http.StatusMethodNotAllowed)
			return
		}

		if err != nil {
			handleError(w, err, sctx.GetLogger())
			return
		}

		// Вызываем хендлер с распарсенными данными
		response, err := handler(sctx, data)
		if err != nil {
			handleError(w, err, sctx.GetLogger())
			return
		}

		// Устанавливаем заголовок и код ответа
		w.Header().Set("Content-Type", "application/json")
		if response != nil {
			if err := json.NewEncoder(w).Encode(response); err != nil {
				sctx.Error("Failed to encode JSON response", err)
				http.Error(w, "Internal Server Error", http.StatusInternalServerError)
			}
		} else {
			w.WriteHeader(http.StatusNoContent)
		}
	}
}

// parseGetParams извлекает параметры из URL, query-параметров и других частей GET-запроса
func parseGetParams(sctx smart_context.ISmartContext, r *http.Request) (map[string]interface{}, error) {
	data := make(map[string]interface{})

	id := chi.URLParam(r, "id")
	if id != "" {
		data["id"] = id
	} else {
		sctx.Warn("ID parameter is missing")
	}

	// Извлекаем query-параметры
	query := r.URL.Query()
	for key, values := range query {
		if len(values) > 0 {
			// Попробуем преобразовать в int или float, если применимо
			if intVal, err := strconv.Atoi(values[0]); err == nil {
				data[key] = intVal
			} else if floatVal, err := strconv.ParseFloat(values[0], 64); err == nil {
				data[key] = floatVal
			} else {
				data[key] = values[0]
			}
		}
	}

	return data, nil
}

// parseFormParams извлекает параметры из формы и преобразует их в JSON-подобный объект
func parseFormParams(r *http.Request) (map[string]interface{}, error) {
	data := make(map[string]interface{})

	contentType := r.Header.Get("Content-Type")
	if contentType == "" {
		return nil, errors.New("Content-Type header is missing")
	}

	if err := r.ParseMultipartForm(20 << 20); err != nil { // ограничение 20MB
		return nil, err
	}

	// Извлекаем текстовые поля формы
	for key, values := range r.Form {
		if len(values) > 0 {
			// Попытка преобразования в int или float
			if intVal, err := strconv.Atoi(values[0]); err == nil {
				data[key] = intVal
			} else if floatVal, err := strconv.ParseFloat(values[0], 64); err == nil {
				data[key] = floatVal
			} else {
				data[key] = values[0]
			}
		}
	}

	// Извлекаем файлы, если есть
	if r.MultipartForm != nil && r.MultipartForm.File != nil {
		if files, ok := r.MultipartForm.File["photos"]; ok && len(files) > 0 {
			data["files"] = files
		}
	}

	return data, nil
}

// handleError обрабатывает ошибки, отправляя JSON-ответ с сообщением об ошибке
func handleError(w http.ResponseWriter, err error, log *zap.Logger) {
	log.Error("Handler error", zap.Error(err))
	w.Header().Set("Content-Type", "application/json")

	// var statusCode int
	// Можно добавить более сложную логику определения кода ошибки
	statusCode := http.StatusInternalServerError

	w.WriteHeader(statusCode)
	json.NewEncoder(w).Encode(map[string]string{"error": err.Error()})
}
