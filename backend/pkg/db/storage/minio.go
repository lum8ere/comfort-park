package storage

import (
	"context"
	"fmt"
	"io"
	"log"

	"github.com/minio/minio-go/v7"
	"github.com/minio/minio-go/v7/pkg/credentials"
)

var MinioClient *minio.Client

func InitMinio(endpoint, accessKey, secretKey string, useSSL bool) {
	var err error
	MinioClient, err = minio.New(endpoint, &minio.Options{
		Creds:  credentials.NewStaticV4(accessKey, secretKey, ""),
		Secure: useSSL,
	})
	if err != nil {
		log.Fatalf("Failed to initialize MinIO client: %v", err)
	}
}

func CreateBucketIfNotExists(bucketName string) error {
	ctx := context.Background()
	exists, err := MinioClient.BucketExists(ctx, bucketName)
	if err != nil {
		return err
	}
	if !exists {
		err = MinioClient.MakeBucket(ctx, bucketName, minio.MakeBucketOptions{})
		if err != nil {
			return err
		}
		log.Printf("Bucket %s created successfully", bucketName)
	}
	return nil
}

func UploadFile(bucketName, objectName string, file io.Reader, fileSize int64) (string, error) {
	// Убедимся, что бакет существует
	ctx := context.Background()
	exists, err := MinioClient.BucketExists(ctx, bucketName)
	if err != nil {
		return "", fmt.Errorf("ошибка проверки существования бакета: %v", err)
	}
	if !exists {
		err = MinioClient.MakeBucket(ctx, bucketName, minio.MakeBucketOptions{})
		if err != nil {
			return "", fmt.Errorf("не удалось создать бакет: %v", err)
		}
	}

	// Загружаем объект
	_, err = MinioClient.PutObject(ctx, bucketName, objectName, file, fileSize, minio.PutObjectOptions{
		ContentType: "application/octet-stream", // Можно определить тип контента динамически
	})
	if err != nil {
		return "", fmt.Errorf("не удалось загрузить объект: %v", err)
	}

	// Генерация URL (можно использовать presigned URL или другой метод)
	fileURL := fmt.Sprintf("http://%s/%s/%s", MinioClient.EndpointURL().Host, bucketName, objectName)
	return fileURL, nil
}
