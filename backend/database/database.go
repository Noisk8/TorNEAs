package database

import (
	"fmt"
	"log"
	"os"

	"github.com/joho/godotenv"
	"gorm.io/driver/postgres"
	"gorm.io/gorm"

	"github.com/noisk8/torneas/backend/models"
)

var DB *gorm.DB

// InitDB inicializa la conexión a la base de datos
func InitDB() {
	// Cargar variables de entorno
	err := godotenv.Load()
	if err != nil {
		log.Println("No se pudo cargar el archivo .env, usando valores por defecto")
	}

	// Obtener variables de entorno para la conexión a la base de datos
	dbHost := getEnv("DB_HOST", "localhost")
	dbPort := getEnv("DB_PORT", "5432")
	dbUser := getEnv("DB_USER", "postgres")
	dbPassword := getEnv("DB_PASSWORD", "postgres")
	dbName := getEnv("DB_NAME", "tornea")
	dbSSLMode := getEnv("DB_SSL_MODE", "disable")

	// Construir la cadena de conexión
	dsn := fmt.Sprintf("host=%s port=%s user=%s password=%s dbname=%s sslmode=%s",
		dbHost, dbPort, dbUser, dbPassword, dbName, dbSSLMode)

	// Conectar a la base de datos
	db, err := gorm.Open(postgres.Open(dsn), &gorm.Config{})
	if err != nil {
		log.Fatalf("Error al conectar a la base de datos: %v", err)
	}

	log.Println("Conexión a la base de datos establecida")

	// Migrar los modelos a la base de datos
	err = db.AutoMigrate(
		&models.Equipo{},
		&models.Jugador{},
		&models.Jornada{},
		&models.Partido{},
		&models.Incidencia{},
	)
	if err != nil {
		log.Fatalf("Error al migrar los modelos: %v", err)
	}

	log.Println("Migración de modelos completada")

	// Asignar la conexión a la variable global
	DB = db
}

// getEnv obtiene una variable de entorno o devuelve un valor por defecto
func getEnv(key, defaultValue string) string {
	value := os.Getenv(key)
	if value == "" {
		return defaultValue
	}
	return value
}

// GetDB devuelve la instancia de la base de datos
func GetDB() *gorm.DB {
	return DB
}
