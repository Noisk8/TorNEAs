package services

import (
	"errors"

	"github.com/noisk8/torneas/backend/database"
	"github.com/noisk8/torneas/backend/models"
	"gorm.io/gorm"
)

// JugadorService proporciona métodos para interactuar con los jugadores
type JugadorService struct {
	DB *gorm.DB
}

// NewJugadorService crea una nueva instancia del servicio de jugadores
func NewJugadorService() *JugadorService {
	return &JugadorService{
		DB: database.GetDB(),
	}
}

// GetAllJugadores obtiene todos los jugadores
func (s *JugadorService) GetAllJugadores() ([]models.Jugador, error) {
	var jugadores []models.Jugador
	result := s.DB.Find(&jugadores)
	return jugadores, result.Error
}

// GetJugadorByID obtiene un jugador por su ID
func (s *JugadorService) GetJugadorByID(id uint) (models.Jugador, error) {
	var jugador models.Jugador
	result := s.DB.First(&jugador, id)
	if result.Error != nil {
		if errors.Is(result.Error, gorm.ErrRecordNotFound) {
			return jugador, errors.New("jugador no encontrado")
		}
		return jugador, result.Error
	}
	return jugador, nil
}

// CreateJugador crea un nuevo jugador
func (s *JugadorService) CreateJugador(jugador models.Jugador) (models.Jugador, error) {
	result := s.DB.Create(&jugador)
	return jugador, result.Error
}

// UpdateJugador actualiza un jugador existente
func (s *JugadorService) UpdateJugador(jugador models.Jugador) (models.Jugador, error) {
	result := s.DB.Save(&jugador)
	return jugador, result.Error
}

// DeleteJugador elimina un jugador por su ID
func (s *JugadorService) DeleteJugador(id uint) error {
	result := s.DB.Delete(&models.Jugador{}, id)
	return result.Error
}

// GetTablaGoleadores obtiene la tabla de goleadores
func (s *JugadorService) GetTablaGoleadores() ([]models.Jugador, error) {
	// Estructura para almacenar jugadores con sus estadísticas
	type JugadorStats struct {
		models.Jugador
		EquipoNombre string
	}
	
	var jugadoresStats []JugadorStats
	
	// Consulta para obtener jugadores, sus equipos y contar sus goles
	query := `
		SELECT j.*, e.nombre as equipo_nombre, 
		COUNT(CASE WHEN i.tipo = 'GOL' OR i.tipo = 'GOL_PENAL' THEN 1 END) as goles,
		COUNT(CASE WHEN i.tipo = 'GOL_PENAL' THEN 1 END) as penales,
		COUNT(CASE WHEN i.tipo = 'ASISTENCIA' THEN 1 END) as asistencias,
		COUNT(DISTINCT p.id) as partidos_jugados
		FROM jugadores j
		JOIN equipos e ON j.equipo_id = e.id
		LEFT JOIN incidencias i ON j.id = i.jugador_id
		LEFT JOIN partidos p ON i.partido_id = p.id
		GROUP BY j.id, e.nombre
		ORDER BY goles DESC, asistencias DESC
		LIMIT 50
	`
	
	result := s.DB.Raw(query).Scan(&jugadoresStats)
	if result.Error != nil {
		return nil, result.Error
	}
	
	// Convertir a slice de Jugador
	jugadores := make([]models.Jugador, len(jugadoresStats))
	for i, js := range jugadoresStats {
		jugadores[i] = js.Jugador
	}
	
	return jugadores, nil
}

// GetJugadoresByEquipo obtiene los jugadores de un equipo específico
func (s *JugadorService) GetJugadoresByEquipo(equipoID uint) ([]models.Jugador, error) {
	var jugadores []models.Jugador
	result := s.DB.Where("equipo_id = ?", equipoID).Find(&jugadores)
	return jugadores, result.Error
}

// GetEstadisticasJugador obtiene las estadísticas detalladas de un jugador
func (s *JugadorService) GetEstadisticasJugador(jugadorID uint) (models.Jugador, error) {
	var jugador models.Jugador
	
	// Obtener datos básicos del jugador
	if err := s.DB.First(&jugador, jugadorID).Error; err != nil {
		return jugador, err
	}
	
	// Obtener goles
	var goles int64
	s.DB.Model(&models.Incidencia{}).
		Where("jugador_id = ? AND (tipo = ? OR tipo = ?)", jugadorID, "GOL", "GOL_PENAL").
		Count(&goles)
	jugador.Goles = int(goles)
	
	// Obtener goles de penal
	var penales int64
	s.DB.Model(&models.Incidencia{}).
		Where("jugador_id = ? AND tipo = ?", jugadorID, "GOL_PENAL").
		Count(&penales)
	
	// Obtener asistencias
	var asistencias int64
	s.DB.Model(&models.Incidencia{}).
		Where("jugador_id = ? AND tipo = ?", jugadorID, "ASISTENCIA").
		Count(&asistencias)
	jugador.Asistencias = int(asistencias)
	
	// Obtener tarjetas amarillas
	var amarillas int64
	s.DB.Model(&models.Incidencia{}).
		Where("jugador_id = ? AND tipo = ?", jugadorID, "TARJETA_AMARILLA").
		Count(&amarillas)
	jugador.TarjetasAmarillas = int(amarillas)
	
	// Obtener tarjetas rojas
	var rojas int64
	s.DB.Model(&models.Incidencia{}).
		Where("jugador_id = ? AND tipo = ?", jugadorID, "TARJETA_ROJA").
		Count(&rojas)
	jugador.TarjetasRojas = int(rojas)
	
	// Obtener partidos jugados (contar partidos distintos donde el jugador tuvo alguna incidencia)
	type Result struct {
		Count int
	}
	var result Result
	s.DB.Raw(`
		SELECT COUNT(DISTINCT partido_id) as count 
		FROM incidencias 
		WHERE jugador_id = ?
	`, jugadorID).Scan(&result)
	jugador.PartidosJugados = result.Count
	
	return jugador, nil
}
