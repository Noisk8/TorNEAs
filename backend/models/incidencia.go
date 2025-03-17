package models

import "time"

// TipoIncidencia representa el tipo de evento durante un partido
type TipoIncidencia string

const (
	Gol            TipoIncidencia = "GOL"
	GolPenal       TipoIncidencia = "GOL_PENAL"
	GolEnContra    TipoIncidencia = "GOL_EN_CONTRA"
	TarjetaAmarilla TipoIncidencia = "TARJETA_AMARILLA"
	TarjetaRoja    TipoIncidencia = "TARJETA_ROJA"
	Sustitucion    TipoIncidencia = "SUSTITUCION"
	Asistencia     TipoIncidencia = "ASISTENCIA"
)

// Incidencia representa un evento durante un partido
type Incidencia struct {
	ID          uint           `json:"id" gorm:"primaryKey"`
	PartidoID   uint           `json:"partidoId" gorm:"not null"`
	JugadorID   uint           `json:"jugadorId" gorm:"not null"`
	Jugador     Jugador        `json:"jugador,omitempty" gorm:"foreignKey:JugadorID"`
	Tipo        TipoIncidencia `json:"tipo" gorm:"size:20;not null"`
	Minuto      int            `json:"minuto"`
	Descripcion string         `json:"descripcion" gorm:"size:255"`
	Timestamp   time.Time      `json:"timestamp"`
}
