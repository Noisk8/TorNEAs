package main

import (
	"log"
	"net/http"
	"os"
	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	"github.com/joho/godotenv"
	"github.com/noisk8/torneas/backend/controllers"
	"github.com/noisk8/torneas/backend/models"
	"gorm.io/driver/postgres"
	"gorm.io/gorm"
)

func main() {
	// Cargar variables de entorno
	err := godotenv.Load()
	if err != nil {
		log.Println("No se pudo cargar el archivo .env, usando valores por defecto")
	}

	// Configurar la conexión a la base de datos
	dsn := "host=localhost user=postgres password=postgres dbname=torneas port=5432 sslmode=disable"
	db, err := gorm.Open(postgres.Open(dsn), &gorm.Config{})
	if err != nil {
		log.Fatalf("Error al conectar con la base de datos: %v", err)
	}

	// Migrar los modelos
	db.AutoMigrate(&models.Usuario{})

	// Configurar el router con Gin
	router := gin.Default()

	// Configurar CORS
	config := cors.DefaultConfig()
	config.AllowOrigins = []string{"http://localhost:3000"}
	config.AllowMethods = []string{"GET", "POST", "PUT", "DELETE", "OPTIONS"}
	config.AllowHeaders = []string{"Origin", "Content-Type", "Authorization"}
	router.Use(cors.New(config))

	// Obtener puerto de las variables de entorno o usar el valor por defecto
	port := os.Getenv("PORT")
	if port == "" {
		port = "8080"
	}

	// Rutas de la API
	api := router.Group("/api")
	{
		// Rutas de autenticación
		auth := api.Group("/auth")
		{
			auth.POST("/register", controllers.Register(db))
			auth.POST("/login", controllers.Login(db))
			auth.GET("/verify", controllers.VerifyToken())
		}

		// Rutas para equipos
		equipos := api.Group("/equipos")
		{
			equipos.GET("", controllers.ObtenerEquipos(db))
			equipos.GET("/:id", controllers.ObtenerEquipo(db))
			equipos.POST("", controllers.CrearEquipo(db))
			equipos.PUT("/:id", controllers.ActualizarEquipo(db))
			equipos.DELETE("/:id", controllers.EliminarEquipo(db))
		}

		// Rutas para la tabla de posiciones
		api.GET("/posiciones", getPosiciones)

		// Rutas para goleadores
		api.GET("/goleadores", getGoleadores)

		// Rutas para el calendario
		api.GET("/calendario", getCalendario)
		api.GET("/calendario/jornada/:numero", getCalendarioByJornada)
	}

	// Iniciar el servidor
	log.Printf("Servidor iniciado en el puerto %s\n", port)
	if err := router.Run(":" + port); err != nil {
		log.Fatalf("Error al iniciar el servidor: %v", err)
	}
}

// Handlers temporales para las rutas
// Estos serán reemplazados por implementaciones reales que usen la base de datos

func getPosiciones(c *gin.Context) {
	c.JSON(http.StatusOK, gin.H{
		"message": "Tabla de posiciones - Implementación pendiente",
	})
}

func getGoleadores(c *gin.Context) {
	c.JSON(http.StatusOK, gin.H{
		"message": "Tabla de goleadores - Implementación pendiente",
	})
}

func getCalendario(c *gin.Context) {
	c.JSON(http.StatusOK, gin.H{
		"message": "Calendario completo - Implementación pendiente",
	})
}

func getCalendarioByJornada(c *gin.Context) {
	numero := c.Param("numero")
	c.JSON(http.StatusOK, gin.H{
		"message": "Calendario de la jornada " + numero + " - Implementación pendiente",
	})
}
