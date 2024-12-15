package smart_context

import (
	"io"
)

type IMinioManager interface {
	UploadFile(sctx ISmartContext, bucketName, objectName string, fileData io.Reader, fileSize int64) (string, error)
	// DownloadFile(sctx ISmartContext, bucketName, objectName string) ([]byte, error)
	// DeleteFile(sctx ISmartContext, bucketName, objectName string) error
	// DeleteFiles(sctx ISmartContext, bucketName string, objectNames []string) error
	// IsBucketExists(sctx ISmartContext, bucketName string) (bool, error)
	// EmptyBucket(sctx ISmartContext, bucketName string) error
	// GetFilesInBucket(sctx ISmartContext, bucketName string) ([]ObjectInfo, error)
}

type ObjectInfo struct {
	Name        string `json:"name"` // Name of the object
	ContentType string `json:"contentType"`
}

type UploadOptions struct {
	ObjectSize  int64
	ContentType string
}
