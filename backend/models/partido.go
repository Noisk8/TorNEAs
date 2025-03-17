package models

import "time"

// Partido representa un encuentro entre dos equipos
type Partido struct {
	ID             uint      `json:"id" gorm:"primaryKey"`
	JornadaID      uint      `json:"jornadaId" gorm:"not null"`
	EquipoLocalID  uint      `json:"equipoLocalId" gorm:"not null"`
	EquipoLocal    Equipo    `json:"equipoLocal,omitempty" gorm:"foreignKey:EquipoLocalID"`
	EquipoVisitanteID uint   `json:"equipoVisitanteId" gorm:"not null"`
	EquipoVisitante Equipo   `json:"equipoVisitante,omitempty" gorm:"foreignKey:EquipoVisitanteID"`
	GolesLocal     *int      `json:"golesLocal"` // Puntero para permitir valores nulos (partidos no jugados)
	GolesVisitante *int      `json:"golesVisitante"`
	Fecha          time.Time `json:"fecha"`
	Hora           string    `json:"hora" gorm:"size:5"` // Formato: "HH:MM"
	Estadio        string    `json:"estadio" gorm:"size:100"`
	Ciudad         string    `json:"ciudad" gorm:"size:100"`
	Estado         string    `json:"estado" gorm:"size:20"` // "Por jugar", "En curso", "Finalizado"
	Jornada        Jornada   `json:"jornada,omitempty" gorm:"foreignKey:JornadaID"`
	Incidencias    []Incidencia `json:"incidencias,omitempty" gorm:"foreignKey:PartidoID"`
}
