package controllers

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
	"github.com/noisk8/torneas/backend/models"
)

// CrearEquipo maneja la creación de un nuevo equipo
func CrearEquipo(db *gorm.DB) gin.HandlerFunc {
	return func(c *gin.Context) {
		var equipo models.Equipo
		if err := c.ShouldBindJSON(&equipo); err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": "Datos inválidos"})
			return
		}

		result := db.Create(&equipo)
		if result.Error != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": "Error al crear el equipo"})
			return
		}

		c.JSON(http.StatusCreated, gin.H{
			"mensaje": "Equipo creado exitosamente",
			"equipo":  equipo,
		})
	}
}

// ActualizarEquipo maneja la actualización de un equipo existente
func ActualizarEquipo(db *gorm.DB) gin.HandlerFunc {
	return func(c *gin.Context) {
		id := c.Param("id")
		var equipo models.Equipo

		if err := db.First(&equipo, id).Error; err != nil {
			c.JSON(http.StatusNotFound, gin.H{"error": "Equipo no encontrado"})
			return
		}

		if err := c.ShouldBindJSON(&equipo); err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": "Datos inválidos"})
			return
		}

		if err := db.Save(&equipo).Error; err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": "Error al actualizar el equipo"})
			return
		}

		c.JSON(http.StatusOK, gin.H{
			"mensaje": "Equipo actualizado exitosamente",
			"equipo":  equipo,
		})
	}
}

// ObtenerEquipos retorna la lista de todos los equipos
func ObtenerEquipos(db *gorm.DB) gin.HandlerFunc {
	return func(c *gin.Context) {
		var equipos []models.Equipo
		if err := db.Find(&equipos).Error; err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": "Error al obtener los equipos"})
			return
		}

		// Calcular estadísticas para cada equipo
		for i := range equipos {
			// Partidos jugados
			var pj int64
			db.Model(&models.Partido{}).
				Where("(equipo_local_id = ? OR equipo_visitante_id = ?) AND estado = ?", 
					equipos[i].ID, equipos[i].ID, "finalizado").
				Count(&pj)
			equipos[i].PJ = int(pj)

			// Partidos ganados
			var pg int64
			db.Model(&models.Partido{}).
				Where("((equipo_local_id = ? AND goles_local > goles_visitante) OR "+
					"(equipo_visitante_id = ? AND goles_visitante > goles_local)) AND estado = ?",
					equipos[i].ID, equipos[i].ID, "finalizado").
				Count(&pg)
			equipos[i].PG = int(pg)

			// Partidos empatados
			var pe int64
			db.Model(&models.Partido{}).
				Where("((equipo_local_id = ? OR equipo_visitante_id = ?) AND "+
					"goles_local = goles_visitante AND estado = ?)",
					equipos[i].ID, equipos[i].ID, "finalizado").
				Count(&pe)
			equipos[i].PE = int(pe)

			// Partidos perdidos
			var pp int64
			db.Model(&models.Partido{}).
				Where("((equipo_local_id = ? AND goles_local < goles_visitante) OR "+
					"(equipo_visitante_id = ? AND goles_visitante < goles_local)) AND estado = ?",
					equipos[i].ID, equipos[i].ID, "finalizado").
				Count(&pp)
			equipos[i].PP = int(pp)

			// Goles a favor y en contra
			var golesLocal, golesVisitante int
			type ResultadoPartido struct {
				GolesLocal     int
				GolesVisitante int
				EquipoLocalID  uint
			}
			var partidos []ResultadoPartido
			
			if err := db.Model(&models.Partido{}).
				Select("goles_local, goles_visitante, equipo_local_id").
				Where("(equipo_local_id = ? OR equipo_visitante_id = ?) AND estado = ?",
					equipos[i].ID, equipos[i].ID, "finalizado").
				Find(&partidos).Error; err == nil {
				
				for _, partido := range partidos {
					if partido.EquipoLocalID == equipos[i].ID {
						// El equipo jugó como local
						golesLocal += partido.GolesLocal
						golesVisitante += partido.GolesVisitante
					} else {
						// El equipo jugó como visitante
						golesLocal += partido.GolesVisitante
						golesVisitante += partido.GolesLocal
					}
				}
			}

			equipos[i].GF = golesLocal
			equipos[i].GC = golesVisitante
			equipos[i].DG = golesLocal - golesVisitante
			equipos[i].Puntos = (equipos[i].PG * 3) + equipos[i].PE

			// Últimos 5 juegos
			var ultimosPartidos []models.Partido
			db.Where("(equipo_local_id = ? OR equipo_visitante_id = ?) AND estado = ?",
				equipos[i].ID, equipos[i].ID, "finalizado").
				Order("fecha_hora DESC").
				Limit(5).
				Find(&ultimosPartidos)

			ultimosJuegos := ""
			for _, partido := range ultimosPartidos {
				if partido.EquipoLocalID == equipos[i].ID {
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
			equipos[i].UltimosJuegos = ultimosJuegos
		}

		c.JSON(http.StatusOK, equipos)
	}
}

// ObtenerEquipo retorna un equipo específico por su ID
func ObtenerEquipo(db *gorm.DB) gin.HandlerFunc {
	return func(c *gin.Context) {
		id := c.Param("id")
		var equipo models.Equipo

		if err := db.First(&equipo, id).Error; err != nil {
			c.JSON(http.StatusNotFound, gin.H{"error": "Equipo no encontrado"})
			return
		}

		c.JSON(http.StatusOK, equipo)
	}
}

// EliminarEquipo elimina un equipo por su ID
func EliminarEquipo(db *gorm.DB) gin.HandlerFunc {
	return func(c *gin.Context) {
		id := c.Param("id")
		var equipo models.Equipo

		if err := db.First(&equipo, id).Error; err != nil {
			c.JSON(http.StatusNotFound, gin.H{"error": "Equipo no encontrado"})
			return
		}

		if err := db.Delete(&equipo).Error; err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": "Error al eliminar el equipo"})
			return
		}

		c.JSON(http.StatusOK, gin.H{"mensaje": "Equipo eliminado exitosamente"})
	}
}
