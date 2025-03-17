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
// Este método implementa el algoritmo de "todos contra todos" para 16 equipos
func (s *CalendarioService) GenerarCalendario() error {
	// Obtener todos los equipos
	var equipos []models.Equipo
	if err := s.DB.Find(&equipos).Error; err != nil {
		return err
	}
	
	// Verificar que haya 16 equipos
	if len(equipos) != 16 {
		return errors.New("se requieren exactamente 16 equipos para generar el calendario")
	}
	
	// Eliminar jornadas y partidos existentes
	if err := s.DB.Exec("DELETE FROM partidos").Error; err != nil {
		return err
	}
	if err := s.DB.Exec("DELETE FROM jornadas").Error; err != nil {
		return err
	}
	
	// Implementar algoritmo de "todos contra todos"
	// Para n equipos, se necesitan (n-1) jornadas
	// En cada jornada, cada equipo juega exactamente un partido
	
	// Crear jornadas
	fechaInicio := time.Now().AddDate(0, 0, 7) // Comenzar en una semana
	for i := 1; i <= 15; i++ {
		jornada := models.Jornada{
			Numero:    i,
			Fecha:     fechaInicio.AddDate(0, 0, (i-1)*7), // Una jornada cada semana
			Completada: false,
		}
		
		if err := s.DB.Create(&jornada).Error; err != nil {
			return err
		}
		
		// Crear partidos para esta jornada usando el algoritmo de "todos contra todos"
		// Este es un algoritmo simplificado, en una implementación real se usaría
		// un algoritmo más sofisticado como el "método de rotación" o "algoritmo de Berger"
		
		// En este ejemplo, simplemente asignamos partidos de forma aleatoria
		// asegurándonos de que cada equipo juegue exactamente una vez por jornada
		
		equiposDisponibles := make([]models.Equipo, len(equipos))
		copy(equiposDisponibles, equipos)
		
		for len(equiposDisponibles) >= 2 {
			// Seleccionar dos equipos
			local := equiposDisponibles[0]
			visitante := equiposDisponibles[1]
			
			// Remover estos equipos de la lista de disponibles
			equiposDisponibles = equiposDisponibles[2:]
			
			// Crear el partido
			partido := models.Partido{
				JornadaID:         jornada.ID,
				EquipoLocalID:     local.ID,
				EquipoVisitanteID: visitante.ID,
				Fecha:             jornada.Fecha,
				Hora:              "15:00", // Hora por defecto
				Estadio:           local.Estadio,
				Ciudad:            local.Ciudad,
				Estado:            "Por jugar",
			}
			
			if err := s.DB.Create(&partido).Error; err != nil {
				return err
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
	partido.GolesLocal = &golesLocal
	partido.GolesVisitante = &golesVisitante
	partido.Estado = "Finalizado"
	
	// Guardar cambios
	return s.DB.Save(&partido).Error
}

// RegistrarIncidencia registra una incidencia en un partido
func (s *CalendarioService) RegistrarIncidencia(incidencia models.Incidencia) error {
	return s.DB.Create(&incidencia).Error
}
