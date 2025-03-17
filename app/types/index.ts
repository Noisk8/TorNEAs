export interface Equipo {
  id: number;
  nombre: string;
  nombreCorto: string;
  ciudad: string;
  estadio: string;
  fundacion: string;
  escudo: string;
}

export interface Jugador {
  id: number;
  numero: number;
  nombre: string;
  apellido: string;
  nombreUrl: string;
  nacionalidad: string;
  edad: number;
  fechaNacimiento: string;
  altura: string;
  peso: number;
  posicion: string;
  goles: number;
  asistencias: number;
  tarjetasAmarillas: number;
  tarjetasRojas: number;
  partidosJugados: number;
  minutos: number;
}

export interface Partido {
  id: number;
  equipoLocalId: number;
  equipoVisitanteId: number;
  fecha: string;
  hora: string;
  estado: "Programado" | "En Curso" | "Finalizado" | "Suspendido";
  jornada: number;
  golesLocal: number | null;
  golesVisitante: number | null;
  estadio: string;
}

export interface TablaPosicion {
  equipoId: number;
  puntos: number;
  partidosJugados: number;
  partidosGanados: number;
  partidosEmpatados: number;
  partidosPerdidos: number;
  golesAFavor: number;
  golesEnContra: number;
  diferenciaGoles: number;
}
