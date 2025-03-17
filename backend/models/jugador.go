package models

import "time"

// Jugador representa un jugador de fútbol en el torneo
type Jugador struct {
	ID              uint      `json:"id" gorm:"primaryKey"`
	Nombre          string    `json:"nombre" gorm:"size:100;not null"`
	Apellido        string    `json:"apellido" gorm:"size:100;not null"`
	FechaNacimiento time.Time `json:"fechaNacimiento"`
	Nacionalidad    string    `json:"nacionalidad" gorm:"size:50"`
	Posicion        string    `json:"posicion" gorm:"size:50"` // Delantero, Mediocampista, Defensa, Portero
	Numero          int       `json:"numero"`
	Altura          float64   `json:"altura"` // En metros
	Peso            float64   `json:"peso"`   // En kilogramos
	Foto            string    `json:"foto" gorm:"size:255"`
	EquipoID        uint      `json:"equipoId" gorm:"not null"`
	Goles           int       `json:"goles" gorm:"-"`
	Asistencias     int       `json:"asistencias" gorm:"-"`
	TarjetasAmarillas int     `json:"tarjetasAmarillas" gorm:"-"`
	TarjetasRojas   int       `json:"tarjetasRojas" gorm:"-"`
	MinutosJugados  int       `json:"minutosJugados" gorm:"-"`
	PartidosJugados int       `json:"partidosJugados" gorm:"-"`
}
