// Tipos de datos
export interface Equipo {
  id: number;
  nombre: string;
  nombreCorto: string;
  ciudad: string;
  fundacion: number;
  estadio: string;
  entrenador: string;
  logo: string;
  descripcion: string;
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

// Datos simulados de equipos
export const equipos: Equipo[] = [
  { id: 1, nombre: "Atlético-Nacional", nombreCorto: "nacional", ciudad: "Medellín", fundacion: 1947, estadio: "Atanasio Girardot", entrenador: "Juan Carlos Osorio", logo: "/equipos/atletico-nacional.png", descripcion: "Atlético Nacional es uno de los clubes más tradicionales y exitosos de Colombia. Fundado en 1947, es el único equipo colombiano que ha ganado dos Copas Libertadores." },
  { id: 2, nombre: "Independiente-Medellín", nombreCorto: "medellin", ciudad: "Medellín", fundacion: 1913, estadio: "Atanasio Girardot", entrenador: "Julio Comesaña", logo: "/equipos/independiente-medellin.png", descripcion: "El Deportivo Independiente Medellín, conocido como DIM, es uno de los equipos más antiguos de Colombia, fundado en 1913. Comparte el estadio Atanasio Girardot con su rival de ciudad, Atlético Nacional." },
  { id: 3, nombre: "América-de-Cali", nombreCorto: "america", ciudad: "Cali", fundacion: 1927, estadio: "Pascual Guerrero", entrenador: "Juan Cruz Real", logo: "/equipos/america-cali.png", descripcion: "América de Cali, conocido como 'La Mechita', es uno de los equipos más populares de Colombia. Ha ganado 14 títulos de liga y fue finalista de la Copa Libertadores en tres ocasiones consecutivas." },
  { id: 4, nombre: "Millonarios-FC", nombreCorto: "millonarios", ciudad: "Bogotá", fundacion: 1946, estadio: "El Campín", entrenador: "Alberto Gamero", logo: "/equipos/millonarios.png", descripcion: "Millonarios FC es uno de los clubes más laureados del fútbol colombiano. Conocido por su época dorada en los años 50 con el 'Ballet Azul', ha ganado 15 títulos de liga." },
  { id: 5, nombre: "Junior-FC", nombreCorto: "junior", ciudad: "Barranquilla", fundacion: 1924, estadio: "Metropolitano", entrenador: "Luis Amaranto Perea", logo: "/equipos/junior.png", descripcion: "El Junior de Barranquilla, conocido como 'El Tiburón', es el equipo más representativo de la costa caribeña colombiana. Ha ganado 9 títulos de liga y representa la alegría y el folclor de la región." },
  { id: 6, nombre: "Deportivo-Cali", nombreCorto: "cali", ciudad: "Cali", fundacion: 1912, estadio: "Deportivo Cali", entrenador: "Rafael Dudamel", logo: "/equipos/deportivo-cali.png", descripcion: "El Deportivo Cali es uno de los equipos más antiguos de Colombia, fundado en 1912. Es conocido por su excelente trabajo en divisiones menores y ha ganado 10 títulos de liga." },
  { id: 7, nombre: "Independiente-Santa-Fe", nombreCorto: "santafe", ciudad: "Bogotá", fundacion: 1941, estadio: "El Campín", entrenador: "Harold Rivera", logo: "/equipos/santa-fe.png", descripcion: "Santa Fe fue el primer campeón del fútbol profesional colombiano en 1948. Conocido como 'El Expreso Rojo', fue también el primer equipo colombiano en ganar la Copa Sudamericana." },
  { id: 8, nombre: "Envigado-FC", nombreCorto: "envigado", ciudad: "Envigado", fundacion: 1989, estadio: "Polideportivo Sur", entrenador: "José Alberto Suárez", logo: "/equipos/envigado.png", descripcion: "Envigado FC es conocido como 'La Cantera de Héroes' por su excelente trabajo formativo. De sus filas han salido jugadores como James Rodríguez y Juan Fernando Quintero." },
  { id: 9, nombre: "La-Equidad", nombreCorto: "equidad", ciudad: "Bogotá", fundacion: 1982, estadio: "Metropolitano de Techo", entrenador: "Alexis García", logo: "/equipos/la-equidad.png", descripcion: "La Equidad es uno de los equipos más jóvenes de la primera división colombiana. Destaca por su estabilidad institucional y su juego ordenado." },
  { id: 10, nombre: "Once-Caldas", nombreCorto: "oncecaldas", ciudad: "Manizales", fundacion: 1961, estadio: "Palogrande", entrenador: "Eduardo Lara", logo: "/equipos/once-caldas.png", descripcion: "Once Caldas sorprendió al mundo al ganar la Copa Libertadores en 2004, venciendo en la final al Boca Juniors. Es el equipo más representativo de la región cafetera." },
  { id: 11, nombre: "Deportes-Tolima", nombreCorto: "tolima", ciudad: "Ibagué", fundacion: 1954, estadio: "Manuel Murillo Toro", entrenador: "Hernán Torres", logo: "/equipos/deportes-tolima.png", descripcion: "El Deportes Tolima se ha convertido en los últimos años en uno de los equipos más competitivos de Colombia. Ha ganado 2 títulos de liga y destaca por su solidez." },
  { id: 12, nombre: "Jaguares-de-Córdoba", nombreCorto: "jaguares", ciudad: "Montería", fundacion: 2012, estadio: "Jaraguay", entrenador: "César Torres", logo: "/equipos/jaguares.png", descripcion: "Jaguares de Córdoba es uno de los equipos más nuevos de la primera división colombiana. Representa a la región de Córdoba y juega sus partidos en Montería." },
  { id: 13, nombre: "Águilas-Doradas", nombreCorto: "aguilas", ciudad: "Rionegro", fundacion: 2008, estadio: "Alberto Grisales", entrenador: "Francesco Stifano", logo: "/equipos/aguilas-doradas.png", descripcion: "Águilas Doradas, anteriormente conocido como Itagüí Ditaires, es un equipo relativamente nuevo en el fútbol colombiano. Ha destacado por su juego ofensivo." },
  { id: 14, nombre: "Deportivo-Pasto", nombreCorto: "pasto", ciudad: "Pasto", fundacion: 1949, estadio: "Departamental Libertad", entrenador: "Diego Corredor", logo: "/equipos/deportivo-pasto.png", descripcion: "El Deportivo Pasto representa a la ciudad de San Juan de Pasto, en el sur de Colombia. Su estadio, ubicado a más de 2.500 metros sobre el nivel del mar, es uno de los más altos del fútbol profesional." },
  { id: 15, nombre: "Patriotas-Boyacá", nombreCorto: "patriotas", ciudad: "Tunja", fundacion: 2003, estadio: "La Independencia", entrenador: "Jorge Luis Bernal", logo: "/equipos/patriotas.png", descripcion: "Patriotas representa a la región de Boyacá y juega en Tunja, una de las ciudades más altas de Colombia. El frío y la altura son sus principales aliados." },
  { id: 16, nombre: "Boyacá-Chicó", nombreCorto: "chico", ciudad: "Tunja", fundacion: 2002, estadio: "La Independencia", entrenador: "Mario García", logo: "/equipos/boyaca-chico.png", descripcion: "El Boyacá Chicó, conocido como 'El Ajedrezado', comparte ciudad con Patriotas. Fue fundado por Eduardo Pimentel, exfutbolista colombiano." },
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
export function generarJugadores(seed: number): Jugador[] {
  const jugadores: Jugador[] = [];
  
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
