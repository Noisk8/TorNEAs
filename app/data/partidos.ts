import { equipos } from "./equipos";
import type { Partido, TablaPosicion } from "~/types";

// Función para generar el calendario en formato liga (todos contra todos)
function generarCalendario(): Partido[] {
  const partidos: Partido[] = [];
  let id = 1;
  const equiposIds = equipos.map(e => e.id);

  // Primera vuelta
  for (let jornada = 1; jornada <= equiposIds.length - 1; jornada++) {
    for (let i = 0; i < equiposIds.length / 2; i++) {
      const local = equiposIds[i];
      const visitante = equiposIds[equiposIds.length - 1 - i];
      
      // Fecha base: comenzando el 1 de marzo 2025
      const fecha = new Date(2025, 2, jornada * 7); // Cada jornada es una semana después
      
      partidos.push({
        id: id++,
        equipoLocalId: local,
        equipoVisitanteId: visitante,
        fecha: fecha.toISOString().split('T')[0],
        hora: "15:00",
        estado: "Programado",
        jornada,
        golesLocal: null,
        golesVisitante: null,
        estadio: equipos.find(e => e.id === local)?.estadio || "Por definir"
      });
    }

    // Rotación de equipos (algoritmo de round-robin)
    equiposIds.splice(1, 0, equiposIds.pop()!);
  }

  // Segunda vuelta (invirtiendo locales y visitantes)
  const primeraVuelta = [...partidos];
  primeraVuelta.forEach(partido => {
    const fecha = new Date(partido.fecha);
    fecha.setMonth(fecha.getMonth() + 3); // Segunda vuelta 3 meses después

    partidos.push({
      id: id++,
      equipoLocalId: partido.equipoVisitanteId,
      equipoVisitanteId: partido.equipoLocalId,
      fecha: fecha.toISOString().split('T')[0],
      hora: "15:00",
      estado: "Programado",
      jornada: partido.jornada + (equiposIds.length - 1),
      golesLocal: null,
      golesVisitante: null,
      estadio: equipos.find(e => e.id === partido.equipoVisitanteId)?.estadio || "Por definir"
    });
  });

  return partidos;
}

export const partidos: Partido[] = generarCalendario();

// Función para obtener la tabla de posiciones
export function obtenerTablaPosiciones(): TablaPosicion[] {
  const tabla: TablaPosicion[] = Array.from({ length: equipos.length }, (_, i) => ({
    equipoId: equipos[i].id,
    puntos: 0,
    partidosJugados: 0,
    partidosGanados: 0,
    partidosEmpatados: 0,
    partidosPerdidos: 0,
    golesAFavor: 0,
    golesEnContra: 0,
    diferenciaGoles: 0
  }));

  partidos
    .filter(p => p.estado === "Finalizado" && p.golesLocal !== null && p.golesVisitante !== null)
    .forEach(p => {
      const local = tabla.find(t => t.equipoId === p.equipoLocalId)!;
      const visitante = tabla.find(t => t.equipoId === p.equipoVisitanteId)!;

      local.partidosJugados++;
      visitante.partidosJugados++;

      local.golesAFavor += p.golesLocal!;
      local.golesEnContra += p.golesVisitante!;
      visitante.golesAFavor += p.golesVisitante!;
      visitante.golesEnContra += p.golesLocal!;

      if (p.golesLocal! > p.golesVisitante!) {
        local.partidosGanados++;
        local.puntos += 3;
        visitante.partidosPerdidos++;
      } else if (p.golesLocal! < p.golesVisitante!) {
        visitante.partidosGanados++;
        visitante.puntos += 3;
        local.partidosPerdidos++;
      } else {
        local.partidosEmpatados++;
        visitante.partidosEmpatados++;
        local.puntos++;
        visitante.puntos++;
      }

      local.diferenciaGoles = local.golesAFavor - local.golesEnContra;
      visitante.diferenciaGoles = visitante.golesAFavor - visitante.golesEnContra;
    });

  return tabla.sort((a, b) => {
    if (a.puntos !== b.puntos) return b.puntos - a.puntos;
    if (a.diferenciaGoles !== b.diferenciaGoles) return b.diferenciaGoles - a.diferenciaGoles;
    return b.golesAFavor - a.golesAFavor;
  });
}

// Función para obtener la tabla de goleadores
export function obtenerTablaGoleadores() {
  const goleadores: { [key: number]: number } = {};
  
  partidos
    .filter(p => p.estado === "Finalizado")
    .forEach(partido => {
      // Aquí se simularían los goles de cada jugador
      // Por ahora solo retornamos un array vacío
    });

  return [];
}
