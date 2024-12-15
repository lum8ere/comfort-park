package env_vars

import (
	"backed-api/libs/4_common/smart_context"
	"os"
	"path/filepath"
	"runtime"
	"strconv"

	"github.com/joho/godotenv"
)

// GetCurrentFolder returns the directory of the current file.
func GetCurrentFolder() string {
	_, filename, _, _ := runtime.Caller(1)
	return filepath.Dir(filename)
}

func LoadEnvVars() {
	sctx := smart_context.NewSmartContext()
	_, filename, _, ok := runtime.Caller(0) // Get the current file path
	if !ok {
		sctx.Fatal("Error finding current file path")
	}

	basePath := filepath.Dir(filename) // Get the directory of the current file
	sctx.Infof("Current file path: %s", basePath)

	envFile := os.Getenv("ENV_PATH")
	if envFile == "" {
		sctx.Info("ENV_PATH is not set, not loading .env file. Using environment variables from the system.")
		return // we are not locally start the app
	}

	sctx.Infof("Found ENV_PATH='%s', so loading environment variables from this file...", envFile)

	// Load the .env file
	envFullFilePath := filepath.Join(basePath, envFile) // Construct the path to your .env file
	err := godotenv.Load(envFullFilePath)
	if err != nil {
		// current working directory
		cwd, _ := os.Getwd()

		sctx.Fatalf("Error loading .env file: %v. Current directory '%s'", err.Error(), cwd)
	} else {
		sctx.Infof("Loaded .env file '%s'", envFile)
	}
}

// Helper to get an environment variable as an integer with a default value
func GetEnvAsInt(sctx smart_context.ISmartContext, key string, defaultValue int) int {
	valueStr := os.Getenv(key)
	if valueStr == "" {
		return defaultValue
	}
	value, err := strconv.Atoi(valueStr)
	if err != nil {
		sctx.Infof("Invalid value for %s: %s. Using default: %d", key, valueStr, defaultValue)
		return defaultValue
	}
	return value
}
