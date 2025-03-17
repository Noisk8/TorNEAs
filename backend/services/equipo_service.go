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
	
	// Para cada equipo, calcular sus estadísticas
	for i := range equipos {
		// Obtener partidos como local
		var partidosLocal []models.Partido
		if err := s.DB.Where("equipo_local_id = ? AND estado = ?", equipos[i].ID, "Finalizado").
			Find(&partidosLocal).Error; err != nil {
			return nil, err
		}
		
		// Obtener partidos como visitante
		var partidosVisitante []models.Partido
		if err := s.DB.Where("equipo_visitante_id = ? AND estado = ?", equipos[i].ID, "Finalizado").
			Find(&partidosVisitante).Error; err != nil {
			return nil, err
		}
		
		// Calcular estadísticas
		equipos[i].PJ = len(partidosLocal) + len(partidosVisitante)
		equipos[i].PG = 0
		equipos[i].PE = 0
		equipos[i].PP = 0
		equipos[i].GF = 0
		equipos[i].GC = 0
		equipos[i].Puntos = 0
		
		// Procesar partidos como local
		for _, partido := range partidosLocal {
			if partido.GolesLocal != nil && partido.GolesVisitante != nil {
				equipos[i].GF += *partido.GolesLocal
				equipos[i].GC += *partido.GolesVisitante
				
				if *partido.GolesLocal > *partido.GolesVisitante {
					equipos[i].PG++
					equipos[i].Puntos += 3
				} else if *partido.GolesLocal == *partido.GolesVisitante {
					equipos[i].PE++
					equipos[i].Puntos += 1
				} else {
					equipos[i].PP++
				}
			}
		}
		
		// Procesar partidos como visitante
		for _, partido := range partidosVisitante {
			if partido.GolesLocal != nil && partido.GolesVisitante != nil {
				equipos[i].GF += *partido.GolesVisitante
				equipos[i].GC += *partido.GolesLocal
				
				if *partido.GolesVisitante > *partido.GolesLocal {
					equipos[i].PG++
					equipos[i].Puntos += 3
				} else if *partido.GolesVisitante == *partido.GolesLocal {
					equipos[i].PE++
					equipos[i].Puntos += 1
				} else {
					equipos[i].PP++
				}
			}
		}
		
		// Calcular diferencia de goles
		equipos[i].DG = equipos[i].GF - equipos[i].GC
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
