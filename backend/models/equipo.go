package models

import "gorm.io/gorm"

// Equipo representa un equipo de fútbol en el torneo
type Equipo struct {
	gorm.Model
	Nombre      string `json:"nombre" binding:"required"`
	NombreCorto string `json:"nombreCorto" binding:"required"`
	Ciudad      string `json:"ciudad" binding:"required"`
	Estadio     string `json:"estadio" binding:"required"`
	Fundacion   string `json:"fundacion" binding:"required"`
	Escudo      string `json:"escudo" binding:"required"`
	Jugadores    []Jugador `json:"jugadores,omitempty" gorm:"foreignKey:EquipoID"`
	PJ           int       `json:"pj" gorm:"-"` // Partidos jugados
	PG           int       `json:"pg" gorm:"-"` // Partidos ganados
	PE           int       `json:"pe" gorm:"-"` // Partidos empatados
	PP           int       `json:"pp" gorm:"-"` // Partidos perdidos
	GF           int       `json:"gf" gorm:"-"` // Goles a favor
	GC           int       `json:"gc" gorm:"-"` // Goles en contra
	DG           int       `json:"dg" gorm:"-"` // Diferencia de goles
	Puntos       int       `json:"puntos" gorm:"-"`
	Posicion     int       `json:"posicion" gorm:"-"`
	UltimosJuegos string    `json:"ultimosJuegos" gorm:"-"` // Ej: "VVEPD" (Victoria, Victoria, Empate, Perdido, Derrota)
}
