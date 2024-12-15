package types

type Config struct {
	ServerAddress   string
	DatabaseURL     string
	MinioEndpoint   string
	MinioAccessKey  string
	MinioSecretKey  string
	MinioBucketName string
	MinioUseSSL     bool
	AdminName       string
	AdminEmail      string
	AdminPassword   string
	JWTSecret       string
}
