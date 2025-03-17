package models

// Equipo representa un equipo de fútbol en el torneo
type Equipo struct {
	ID           uint      `json:"id" gorm:"primaryKey"`
	Nombre       string    `json:"nombre" gorm:"size:100;not null"`
	Ciudad       string    `json:"ciudad" gorm:"size:100"`
	Fundacion    int       `json:"fundacion"`
	Estadio      string    `json:"estadio" gorm:"size:100"`
	Entrenador   string    `json:"entrenador" gorm:"size:100"`
	Escudo       string    `json:"escudo" gorm:"size:255"`
	SitioWeb     string    `json:"sitioWeb" gorm:"size:255"`
	Descripcion  string    `json:"descripcion" gorm:"type:text"`
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
