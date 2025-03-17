package main

import (
	"log"

	"github.com/noisk8/torneas/backend/database"
	"github.com/noisk8/torneas/backend/models"
)

func main() {
	// Inicializar la base de datos
	database.InitDB()

	// Lista de equipos
	equipos := []models.Equipo{
		{
			Nombre:      "Deportivo Pereira",
			NombreCorto: "Pereira",
			Ciudad:      "Pereira",
			Estadio:     "Hernán Ramírez Villegas",
			Fundacion:   "1944",
			Escudo:      "/escudos/pereira.png",
		},
		{
			Nombre:      "Atlético Nacional",
			NombreCorto: "Nacional",
			Ciudad:      "Medellín",
			Estadio:     "Atanasio Girardot",
			Fundacion:   "1947",
			Escudo:      "/escudos/nacional.png",
		},
		{
			Nombre:      "Millonarios FC",
			NombreCorto: "Millonarios",
			Ciudad:      "Bogotá",
			Estadio:     "El Campín",
			Fundacion:   "1946",
			Escudo:      "/escudos/millonarios.png",
		},
		{
			Nombre:      "América de Cali",
			NombreCorto: "América",
			Ciudad:      "Cali",
			Estadio:     "Pascual Guerrero",
			Fundacion:   "1927",
			Escudo:      "/escudos/america.png",
		},
		{
			Nombre:      "Independiente Santa Fe",
			NombreCorto: "Santa Fe",
			Ciudad:      "Bogotá",
			Estadio:     "El Campín",
			Fundacion:   "1941",
			Escudo:      "/escudos/santafe.png",
		},
		{
			Nombre:      "Deportivo Cali",
			NombreCorto: "Cali",
			Ciudad:      "Cali",
			Estadio:     "Deportivo Cali",
			Fundacion:   "1912",
			Escudo:      "/escudos/cali.png",
		},
		{
			Nombre:      "Junior FC",
			NombreCorto: "Junior",
			Ciudad:      "Barranquilla",
			Estadio:     "Metropolitano",
			Fundacion:   "1924",
			Escudo:      "/escudos/junior.png",
		},
		{
			Nombre:      "Independiente Medellín",
			NombreCorto: "Medellín",
			Ciudad:      "Medellín",
			Estadio:     "Atanasio Girardot",
			Fundacion:   "1913",
			Escudo:      "/escudos/medellin.png",
		},
		{
			Nombre:      "Once Caldas",
			NombreCorto: "Once Caldas",
			Ciudad:      "Manizales",
			Estadio:     "Palogrande",
			Fundacion:   "1961",
			Escudo:      "/escudos/oncecaldas.png",
		},
		{
			Nombre:      "Atlético Bucaramanga",
			NombreCorto: "Bucaramanga",
			Ciudad:      "Bucaramanga",
			Estadio:     "Alfonso López",
			Fundacion:   "1949",
			Escudo:      "/escudos/bucaramanga.png",
		},
		{
			Nombre:      "La Equidad",
			NombreCorto: "Equidad",
			Ciudad:      "Bogotá",
			Estadio:     "Metropolitano de Techo",
			Fundacion:   "1982",
			Escudo:      "/escudos/equidad.png",
		},
		{
			Nombre:      "Envigado FC",
			NombreCorto: "Envigado",
			Ciudad:      "Envigado",
			Estadio:     "Polideportivo Sur",
			Fundacion:   "1989",
			Escudo:      "/escudos/envigado.png",
		},
	}

	// Insertar equipos en la base de datos
	for _, equipo := range equipos {
		result := database.DB.Create(&equipo)
		if result.Error != nil {
			log.Printf("Error al crear equipo %s: %v\n", equipo.Nombre, result.Error)
		} else {
			log.Printf("Equipo creado: %s\n", equipo.Nombre)
		}
	}

	log.Println("Proceso de inserción de equipos completado")
}
