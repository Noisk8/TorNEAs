package services

import (
	"errors"
	"time"

	"github.com/noisk8/torneas/backend/database"
	"github.com/noisk8/torneas/backend/models"
	"gorm.io/gorm"
)

// CalendarioService proporciona métodos para interactuar con las jornadas y partidos
type CalendarioService struct {
	DB *gorm.DB
}

// NewCalendarioService crea una nueva instancia del servicio de calendario
func NewCalendarioService() *CalendarioService {
	return &CalendarioService{
		DB: database.GetDB(),
	}
}

// GetCalendarioCompleto obtiene todas las jornadas con sus partidos
func (s *CalendarioService) GetCalendarioCompleto() ([]models.Jornada, error) {
	var jornadas []models.Jornada
	
	// Obtener todas las jornadas ordenadas por número
	result := s.DB.Order("numero").Find(&jornadas)
	if result.Error != nil {
		return nil, result.Error
	}
	
	// Para cada jornada, obtener sus partidos
	for i := range jornadas {
		var partidos []models.Partido
		if err := s.DB.Where("jornada_id = ?", jornadas[i].ID).
			Preload("EquipoLocal").
			Preload("EquipoVisitante").
			Find(&partidos).Error; err != nil {
			return nil, err
		}
		jornadas[i].Partidos = partidos
	}
	
	return jornadas, nil
}

// GetJornadaByNumero obtiene una jornada específica con sus partidos
func (s *CalendarioService) GetJornadaByNumero(numero int) (models.Jornada, error) {
	var jornada models.Jornada
	
	// Obtener la jornada por su número
	result := s.DB.Where("numero = ?", numero).First(&jornada)
	if result.Error != nil {
		if errors.Is(result.Error, gorm.ErrRecordNotFound) {
			return jornada, errors.New("jornada no encontrada")
		}
		return jornada, result.Error
	}
	
	// Obtener los partidos de la jornada
	var partidos []models.Partido
	if err := s.DB.Where("jornada_id = ?", jornada.ID).
		Preload("EquipoLocal").
		Preload("EquipoVisitante").
		Find(&partidos).Error; err != nil {
		return jornada, err
	}
	jornada.Partidos = partidos
	
	return jornada, nil
}

// GetPartidoByID obtiene un partido específico con sus equipos e incidencias
func (s *CalendarioService) GetPartidoByID(id uint) (models.Partido, error) {
	var partido models.Partido
	
	// Obtener el partido con sus equipos
	result := s.DB.
		Preload("EquipoLocal").
		Preload("EquipoVisitante").
		First(&partido, id)
	
	if result.Error != nil {
		if errors.Is(result.Error, gorm.ErrRecordNotFound) {
			return partido, errors.New("partido no encontrado")
		}
		return partido, result.Error
	}
	
	// Obtener las incidencias del partido
	var incidencias []models.Incidencia
	if err := s.DB.Where("partido_id = ?", partido.ID).
		Preload("Jugador").
		Order("minuto").
		Find(&incidencias).Error; err != nil {
		return partido, err
	}
	partido.Incidencias = incidencias
	
	return partido, nil
}

// GetPartidosByEquipo obtiene los partidos de un equipo específico
func (s *CalendarioService) GetPartidosByEquipo(equipoID uint) ([]models.Partido, error) {
	var partidos []models.Partido
	
	// Obtener partidos donde el equipo es local o visitante
	result := s.DB.
		Where("equipo_local_id = ? OR equipo_visitante_id = ?", equipoID, equipoID).
		Preload("EquipoLocal").
		Preload("EquipoVisitante").
		Preload("Jornada").
		Order("fecha, hora").
		Find(&partidos)
	
	return partidos, result.Error
}

// GetProximosPartidos obtiene los próximos N partidos a partir de la fecha actual
func (s *CalendarioService) GetProximosPartidos(cantidad int) ([]models.Partido, error) {
	var partidos []models.Partido
	
	// Obtener partidos a partir de la fecha actual
	result := s.DB.
		Where("fecha >= ?", time.Now()).
		Preload("EquipoLocal").
		Preload("EquipoVisitante").
		Preload("Jornada").
		Order("fecha, hora").
		Limit(cantidad).
		Find(&partidos)
	
	return partidos, result.Error
}

// GetUltimosResultados obtiene los últimos N partidos jugados
func (s *CalendarioService) GetUltimosResultados(cantidad int) ([]models.Partido, error) {
	var partidos []models.Partido
	
	// Obtener partidos finalizados
	result := s.DB.
		Where("estado = ?", "Finalizado").
		Preload("EquipoLocal").
		Preload("EquipoVisitante").
		Preload("Jornada").
		Order("fecha DESC, hora DESC").
		Limit(cantidad).
		Find(&partidos)
	
	return partidos, result.Error
}

// GenerarCalendario genera un calendario completo para el torneo
func (s *CalendarioService) GenerarCalendario() error {
	return GenerarCalendario(s.DB)
}

func GenerarCalendario(db *gorm.DB) error {
	// Obtener todos los equipos
	var equipos []models.Equipo
	if err := db.Find(&equipos).Error; err != nil {
		return err
	}

	// Número de equipos
	numEquipos := len(equipos)
	if numEquipos%2 != 0 {
		return nil // Necesitamos un número par de equipos
	}

	// Número de jornadas será (numEquipos - 1) * 2 para ida y vuelta
	numJornadas := (numEquipos - 1) * 2

	// Fecha inicial para los partidos (primer sábado disponible)
	fechaInicial := time.Now()
	for fechaInicial.Weekday() != time.Saturday {
		fechaInicial = fechaInicial.AddDate(0, 0, 1)
	}

	// Crear jornadas
	for i := 1; i <= numJornadas; i++ {
		jornada := models.Jornada{
			Numero: i,
			Fecha:  fechaInicial.AddDate(0, 0, (i-1)*7), // Cada jornada una semana después
		}

		if err := db.Create(&jornada).Error; err != nil {
			return err
		}

		// Generar partidos para esta jornada
		if i <= numJornadas/2 {
			// Primera vuelta
			for j := 0; j < numEquipos/2; j++ {
				partido := models.Partido{
					JornadaID:         jornada.ID,
					EquipoLocalID:     equipos[j].ID,
					EquipoVisitanteID: equipos[numEquipos-1-j].ID,
					FechaHora:         jornada.Fecha.Add(time.Hour * 15), // 3:00 PM
					Estado:            "pendiente",
					GolesLocal:        0,
					GolesVisitante:    0,
				}
				if err := db.Create(&partido).Error; err != nil {
					return err
				}
			}
		} else {
			// Segunda vuelta (invertir locales y visitantes)
			for j := 0; j < numEquipos/2; j++ {
				partido := models.Partido{
					JornadaID:         jornada.ID,
					EquipoLocalID:     equipos[numEquipos-1-j].ID,
					EquipoVisitanteID: equipos[j].ID,
					FechaHora:         jornada.Fecha.Add(time.Hour * 15), // 3:00 PM
					Estado:            "pendiente",
					GolesLocal:        0,
					GolesVisitante:    0,
				}
				if err := db.Create(&partido).Error; err != nil {
					return err
				}
			}
		}
	}

	return nil
}

// ActualizarResultadoPartido actualiza el resultado de un partido
func (s *CalendarioService) ActualizarResultadoPartido(partidoID uint, golesLocal, golesVisitante int) error {
	// Obtener el partido
	var partido models.Partido
	if err := s.DB.First(&partido, partidoID).Error; err != nil {
		return err
	}
	
	// Actualizar el resultado
	partido.GolesLocal = golesLocal
	partido.GolesVisitante = golesVisitante
	partido.Estado = "Finalizado"
	
	// Guardar cambios
	return s.DB.Save(&partido).Error
}

// RegistrarIncidencia registra una incidencia en un partido
func (s *CalendarioService) RegistrarIncidencia(incidencia models.Incidencia) error {
	return s.DB.Create(&incidencia).Error
}
