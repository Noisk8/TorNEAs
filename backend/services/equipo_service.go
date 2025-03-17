package services

import (
	"errors"

	"github.com/noisk8/torneas/backend/database"
	"github.com/noisk8/torneas/backend/models"
	"gorm.io/gorm"
)

// EquipoService proporciona métodos para interactuar con los equipos
type EquipoService struct {
	DB *gorm.DB
}

// NewEquipoService crea una nueva instancia del servicio de equipos
func NewEquipoService() *EquipoService {
	return &EquipoService{
		DB: database.GetDB(),
	}
}

// GetAllEquipos obtiene todos los equipos
func (s *EquipoService) GetAllEquipos() ([]models.Equipo, error) {
	var equipos []models.Equipo
	result := s.DB.Find(&equipos)
	return equipos, result.Error
}

// GetEquipoByID obtiene un equipo por su ID
func (s *EquipoService) GetEquipoByID(id uint) (models.Equipo, error) {
	var equipo models.Equipo
	result := s.DB.First(&equipo, id)
	if result.Error != nil {
		if errors.Is(result.Error, gorm.ErrRecordNotFound) {
			return equipo, errors.New("equipo no encontrado")
		}
		return equipo, result.Error
	}
	return equipo, nil
}

// GetJugadoresByEquipo obtiene los jugadores de un equipo
func (s *EquipoService) GetJugadoresByEquipo(equipoID uint) ([]models.Jugador, error) {
	var jugadores []models.Jugador
	result := s.DB.Where("equipo_id = ?", equipoID).Find(&jugadores)
	return jugadores, result.Error
}

// CreateEquipo crea un nuevo equipo
func (s *EquipoService) CreateEquipo(equipo models.Equipo) (models.Equipo, error) {
	result := s.DB.Create(&equipo)
	return equipo, result.Error
}

// UpdateEquipo actualiza un equipo existente
func (s *EquipoService) UpdateEquipo(equipo models.Equipo) (models.Equipo, error) {
	result := s.DB.Save(&equipo)
	return equipo, result.Error
}

// DeleteEquipo elimina un equipo por su ID
func (s *EquipoService) DeleteEquipo(id uint) error {
	result := s.DB.Delete(&models.Equipo{}, id)
	return result.Error
}

// GetTablaPosiciones obtiene la tabla de posiciones
func (s *EquipoService) GetTablaPosiciones() ([]models.Equipo, error) {
	var equipos []models.Equipo
	
	// Obtener todos los equipos
	if err := s.DB.Find(&equipos).Error; err != nil {
		return nil, err
	}
	
	// Calcular estadísticas para cada equipo
	for i := range equipos {
		if err := CalcularEstadisticas(s.DB, &equipos[i]); err != nil {
			return nil, err
		}
	}
	
	// Ordenar equipos por puntos, diferencia de goles y goles a favor
	for i := 0; i < len(equipos); i++ {
		for j := i + 1; j < len(equipos); j++ {
			if equipos[i].Puntos < equipos[j].Puntos {
				equipos[i], equipos[j] = equipos[j], equipos[i]
			} else if equipos[i].Puntos == equipos[j].Puntos {
				if equipos[i].DG < equipos[j].DG {
					equipos[i], equipos[j] = equipos[j], equipos[i]
				} else if equipos[i].DG == equipos[j].DG && equipos[i].GF < equipos[j].GF {
					equipos[i], equipos[j] = equipos[j], equipos[i]
				}
			}
		}
	}
	
	// Asignar posiciones
	for i := range equipos {
		equipos[i].Posicion = i + 1
	}
	
	return equipos, nil
}

// CalcularEstadisticas calcula las estadísticas para un equipo
func CalcularEstadisticas(db *gorm.DB, equipo *models.Equipo) error {
	// Obtener todos los partidos finalizados del equipo
	var partidos []models.Partido
	if err := db.Where("(equipo_local_id = ? OR equipo_visitante_id = ?) AND estado = ?",
		equipo.ID, equipo.ID, "finalizado").Find(&partidos).Error; err != nil {
		return err
	}

	// Reiniciar estadísticas
	equipo.PJ = 0
	equipo.PG = 0
	equipo.PE = 0
	equipo.PP = 0
	equipo.GF = 0
	equipo.GC = 0

	// Calcular estadísticas
	for _, partido := range partidos {
		equipo.PJ++

		if partido.EquipoLocalID == equipo.ID {
			// El equipo jugó como local
			equipo.GF += partido.GolesLocal
			equipo.GC += partido.GolesVisitante

			if partido.GolesLocal > partido.GolesVisitante {
				equipo.PG++
			} else if partido.GolesLocal < partido.GolesVisitante {
				equipo.PP++
			} else {
				equipo.PE++
			}
		} else {
			// El equipo jugó como visitante
			equipo.GF += partido.GolesVisitante
			equipo.GC += partido.GolesLocal

			if partido.GolesVisitante > partido.GolesLocal {
				equipo.PG++
			} else if partido.GolesVisitante < partido.GolesLocal {
				equipo.PP++
			} else {
				equipo.PE++
			}
		}
	}

	// Calcular diferencia de goles y puntos
	equipo.DG = equipo.GF - equipo.GC
	equipo.Puntos = (equipo.PG * 3) + equipo.PE

	// Obtener los últimos 5 partidos
	var ultimosPartidos []models.Partido
	if err := db.Where("(equipo_local_id = ? OR equipo_visitante_id = ?) AND estado = ?",
		equipo.ID, equipo.ID, "finalizado").
		Order("fecha_hora DESC").
		Limit(5).
		Find(&ultimosPartidos).Error; err != nil {
		return err
	}

	// Calcular forma reciente
	ultimosJuegos := ""
	for _, partido := range ultimosPartidos {
		if partido.EquipoLocalID == equipo.ID {
			if partido.GolesLocal > partido.GolesVisitante {
				ultimosJuegos += "V"
			} else if partido.GolesLocal < partido.GolesVisitante {
				ultimosJuegos += "D"
			} else {
				ultimosJuegos += "E"
			}
		} else {
			if partido.GolesVisitante > partido.GolesLocal {
				ultimosJuegos += "V"
			} else if partido.GolesVisitante < partido.GolesLocal {
				ultimosJuegos += "D"
			} else {
				ultimosJuegos += "E"
			}
		}
	}
	equipo.UltimosJuegos = ultimosJuegos

	return nil
}
