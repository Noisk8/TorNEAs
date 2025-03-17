package models

import "time"

// Jornada representa una fecha del torneo
type Jornada struct {
	ID        uint      `json:"id" gorm:"primaryKey"`
	Numero    int       `json:"numero" gorm:"not null;unique"`
	Fecha     time.Time `json:"fecha"`
	Partidos  []Partido `json:"partidos,omitempty" gorm:"foreignKey:JornadaID"`
	Completada bool     `json:"completada" gorm:"default:false"`
}
