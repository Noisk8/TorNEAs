import type { Equipo } from "~/types";

export const equipos: Equipo[] = [
  {
    id: 1,
    nombre: "América de Cali",
    nombreCorto: "América",
    ciudad: "Cali",
    estadio: "Pascual Guerrero",
    fundacion: "1927",
    escudo: "/images/equipos/america-de-cali.png"
  },
  {
    id: 2,
    nombre: "Atlético Nacional",
    nombreCorto: "Nacional",
    ciudad: "Medellín",
    estadio: "Atanasio Girardot",
    fundacion: "1947",
    escudo: "/images/equipos/atletico-nacional.png"
  },
  {
    id: 3,
    nombre: "Deportivo Cali",
    nombreCorto: "Cali",
    ciudad: "Cali",
    estadio: "Deportivo Cali",
    fundacion: "1912",
    escudo: "/images/equipos/Deportivo-cali.png"
  },
  {
    id: 4,
    nombre: "Millonarios FC",
    nombreCorto: "Millonarios",
    ciudad: "Bogotá",
    estadio: "El Campín",
    fundacion: "1946",
    escudo: "/images/equipos/MillonariosFC-294x300.png"
  },
  {
    id: 5,
    nombre: "Independiente Santa Fe",
    nombreCorto: "Santa Fe",
    ciudad: "Bogotá",
    estadio: "El Campín",
    fundacion: "1941",
    escudo: "/images/equipos/santa-fe.png"
  }
];

// Datos para generar jugadores
export const nombres = [
  "Carlos", "Juan", "Miguel", "David", "Luis", "Andrés", "José", "Pedro", "Fernando", "Diego",
  "Alejandro", "Santiago", "Sebastián", "Gabriel", "Javier", "Daniel", "Ricardo", "Eduardo",
  "Martín", "Roberto", "Jorge", "Óscar", "Sergio", "Emilio", "Raúl"
];

export const apellidos = [
  "Rodríguez", "Gómez", "González", "Martínez", "Pérez", "López", "Sánchez", "Ramírez", "Torres",
  "Flores", "Rivera", "Morales", "Ortiz", "Vargas", "Mendoza", "Herrera", "Castro", "Gutiérrez",
  "Romero", "Álvarez", "Fernández", "Díaz", "Muñoz", "Rojas", "Suárez", "Reyes", "Cruz", "Moreno"
];

export const nacionalidades = [
  "Colombia", "Argentina", "Brasil", "Uruguay", "Paraguay", "Chile", "Ecuador", "Venezuela", "Perú", "Bolivia"
];

// Función para generar jugadores para un equipo
export function generarJugadores(seed: number): any[] {
  const jugadores: any[] = [];
  
  // Usar el seed para generar los mismos jugadores cada vez
  const random = (max: number) => {
    seed = (seed * 9301 + 49297) % 233280;
    return Math.floor((seed / 233280) * max);
  };

  for (let i = 1; i <= 22; i++) {
    // Determinar posición basada en el número
    let posicion;
    if (i <= 3) posicion = "Portero";
    else if (i <= 9) posicion = "Defensa";
    else if (i <= 17) posicion = "Mediocampista";
    else posicion = "Delantero";
    
    // Generar datos aleatorios para el jugador
    const nombre = nombres[random(nombres.length)];
    const apellido = apellidos[random(apellidos.length)];
    const nombreUrl = `${nombre.toLowerCase()}-${apellido.toLowerCase()}`.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
    const nacionalidad = random(10) > 7 ? nacionalidades[random(nacionalidades.length)] : "Colombia";
    const edad = random(15) + 18;
    const fechaNacimiento = `${2025 - edad}-${random(12) + 1}-${random(28) + 1}`;
    const altura = (random(30) / 100 + 1.7).toFixed(2);
    const peso = random(20) + 65;
    
    // Estadísticas según posición
    let goles = 0, asistencias = 0, tarjetasAmarillas = 0, tarjetasRojas = 0;
    
    switch (posicion) {
      case "Portero":
        goles = 0;
        asistencias = random(2);
        tarjetasAmarillas = random(2);
        tarjetasRojas = random(10) > 9 ? 1 : 0;
        break;
      case "Defensa":
        goles = random(3);
        asistencias = random(4);
        tarjetasAmarillas = random(5) + 1;
        tarjetasRojas = random(10) > 8 ? 1 : 0;
        break;
      case "Mediocampista":
        goles = random(6) + 1;
        asistencias = random(8) + 2;
        tarjetasAmarillas = random(4);
        tarjetasRojas = random(10) > 8.5 ? 1 : 0;
        break;
      case "Delantero":
        goles = random(12) + 3;
        asistencias = random(6) + 1;
        tarjetasAmarillas = random(3);
        tarjetasRojas = random(10) > 9 ? 1 : 0;
        break;
    }

    jugadores.push({
      id: i,
      numero: i,
      nombre,
      apellido,
      nombreUrl,
      nacionalidad,
      edad,
      fechaNacimiento,
      altura,
      peso,
      posicion,
      goles,
      asistencias,
      tarjetasAmarillas,
      tarjetasRojas,
      partidosJugados: random(15) + 5,
      minutos: random(1000) + 500,
    });
  }

  return jugadores;
}
