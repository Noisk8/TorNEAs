package models

import (
	"time"

	"gorm.io/gorm"
)

// Partido representa un partido del torneo
type Partido struct {
	gorm.Model
	JornadaID        uint      `json:"jornadaId"`
	EquipoLocalID    uint      `json:"equipoLocalId"`
	EquipoVisitanteID uint      `json:"equipoVisitanteId"`
	GolesLocal       int       `json:"golesLocal"`
	GolesVisitante   int       `json:"golesVisitante"`
	FechaHora        time.Time `json:"fechaHora"`
	Estado           string    `json:"estado"` // pendiente, en_curso, finalizado
	Incidencias      []Incidencia `json:"incidencias,omitempty" gorm:"foreignKey:PartidoID"`
}
