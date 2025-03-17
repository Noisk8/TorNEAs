import { json } from "@remix-run/node";
import { useLoaderData, Link } from "@remix-run/react";
import { useState } from "react";
import type { MetaFunction } from "@remix-run/node";

export const meta: MetaFunction = () => {
  return [
    { title: "Calendario - TorNEA" },
    { name: "description", content: "Consulta el calendario de partidos del torneo de fútbol TorNEA" },
  ];
};

// Simulamos datos del calendario
// En una implementación real, estos datos vendrían de la API en Go
export const loader = async () => {
  // Creamos un calendario para un torneo de 16 equipos (sistema de todos contra todos)
  // Cada equipo juega contra los demás una vez (15 jornadas)
  
  const equipos = [
    { id: 1, nombre: "Atlético Nacional", ciudad: "Medellín", estadio: "Atanasio Girardot" },
    { id: 2, nombre: "Independiente Medellín", ciudad: "Medellín", estadio: "Atanasio Girardot" },
    { id: 3, nombre: "América de Cali", ciudad: "Cali", estadio: "Pascual Guerrero" },
    { id: 4, nombre: "Millonarios FC", ciudad: "Bogotá", estadio: "El Campín" },
    { id: 5, nombre: "Junior FC", ciudad: "Barranquilla", estadio: "Metropolitano" },
    { id: 6, nombre: "Deportivo Cali", ciudad: "Cali", estadio: "Deportivo Cali" },
    { id: 7, nombre: "Independiente Santa Fe", ciudad: "Bogotá", estadio: "El Campín" },
    { id: 8, nombre: "Envigado FC", ciudad: "Envigado", estadio: "Polideportivo Sur" },
    { id: 9, nombre: "La Equidad", ciudad: "Bogotá", estadio: "Metropolitano de Techo" },
    { id: 10, nombre: "Once Caldas", ciudad: "Manizales", estadio: "Palogrande" },
    { id: 11, nombre: "Deportes Tolima", ciudad: "Ibagué", estadio: "Manuel Murillo Toro" },
    { id: 12, nombre: "Jaguares de Córdoba", ciudad: "Montería", estadio: "Jaraguay" },
    { id: 13, nombre: "Águilas Doradas", ciudad: "Rionegro", estadio: "Alberto Grisales" },
    { id: 14, nombre: "Deportivo Pasto", ciudad: "Pasto", estadio: "Departamental Libertad" },
    { id: 15, nombre: "Patriotas Boyacá", ciudad: "Tunja", estadio: "La Independencia" },
    { id: 16, nombre: "Boyacá Chicó", ciudad: "Tunja", estadio: "La Independencia" },
  ];

  // Generamos fechas para las jornadas (cada 7 días a partir de hoy)
  const fechaInicio = new Date(2025, 2, 1); // 1 de Marzo de 2025
  const jornadas = [];

  for (let i = 0; i < 15; i++) {
    const fechaJornada = new Date(fechaInicio);
    fechaJornada.setDate(fechaJornada.getDate() + (i * 7));
    
    const partidos = [];
    
    // En cada jornada se juegan 8 partidos (16 equipos / 2)
    // Este es un algoritmo simplificado para generar partidos
    // En una implementación real, se usaría un algoritmo más sofisticado para generar el calendario
    
    const equiposDisponibles = [...equipos];
    
    for (let j = 0; j < 8; j++) {
      if (equiposDisponibles.length >= 2) {
        const local = equiposDisponibles.splice(Math.floor(Math.random() * equiposDisponibles.length), 1)[0];
        const visitante = equiposDisponibles.splice(Math.floor(Math.random() * equiposDisponibles.length), 1)[0];
        
        // Generamos una hora aleatoria entre las 13:00 y las 20:00
        const hora = 13 + Math.floor(Math.random() * 8);
        const minutos = Math.random() > 0.5 ? "00" : "30";
        
        // Simulamos algunos resultados para partidos pasados
        let golesLocal = null;
        let golesVisitante = null;
        let estado = "Por jugar";
        
        if (i < 3) { // Primeras 3 jornadas ya se jugaron
          golesLocal = Math.floor(Math.random() * 5);
          golesVisitante = Math.floor(Math.random() * 5);
          estado = "Finalizado";
        } else if (i === 3) { // Jornada actual en curso
          if (j < 6) { // Algunos partidos ya se jugaron
            golesLocal = Math.floor(Math.random() * 5);
            golesVisitante = Math.floor(Math.random() * 5);
            estado = "Finalizado";
          } else if (j === 6) {
            golesLocal = Math.floor(Math.random() * 3);
            golesVisitante = Math.floor(Math.random() * 3);
            estado = "En curso";
          }
        }
        
        partidos.push({
          id: i * 8 + j + 1,
          local,
          visitante,
          fecha: fechaJornada.toISOString().split('T')[0],
          hora: `${hora}:${minutos}`,
          estadio: local.estadio,
          ciudad: local.ciudad,
          golesLocal,
          golesVisitante,
          estado
        });
      }
    }
    
    jornadas.push({
      numero: i + 1,
      fecha: fechaJornada.toISOString().split('T')[0],
      partidos
    });
  }

  return json({ jornadas, equipos });
};

export default function Calendario() {
  const { jornadas, equipos } = useLoaderData<typeof loader>();
  const [jornadaSeleccionada, setJornadaSeleccionada] = useState(1);
  const [filtroEquipo, setFiltroEquipo] = useState("todos");

  // Función para formatear la fecha
  const formatearFecha = (fechaStr: string) => {
    const fecha = new Date(fechaStr);
    return fecha.toLocaleDateString('es-ES', { 
      weekday: 'long', 
      day: 'numeric', 
      month: 'long', 
      year: 'numeric' 
    });
  };

  // Filtrar partidos por equipo si es necesario
  const partidosFiltrados = filtroEquipo === "todos" 
    ? jornadas[jornadaSeleccionada - 1].partidos 
    : jornadas[jornadaSeleccionada - 1].partidos.filter(
        partido => partido.local.id.toString() === filtroEquipo || partido.visitante.id.toString() === filtroEquipo
      );

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-green-100 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 py-8">
        <header className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-green-700 dark:text-green-500 mb-2">
            Calendario de Partidos
          </h1>
          <p className="text-gray-600 dark:text-gray-300">
            Consulta todos los partidos del Torneo TorNEA
          </p>
        </header>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 mb-8">
          <div className="flex flex-col md:flex-row justify-between items-center mb-6">
            <div className="mb-4 md:mb-0">
              <label htmlFor="jornada" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Seleccionar Jornada
              </label>
              <select
                id="jornada"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                value={jornadaSeleccionada}
                onChange={(e) => setJornadaSeleccionada(Number(e.target.value))}
              >
                {jornadas.map((jornada) => (
                  <option key={jornada.numero} value={jornada.numero}>
                    Jornada {jornada.numero} - {formatearFecha(jornada.fecha)}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="equipo" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Filtrar por Equipo
              </label>
              <select
                id="equipo"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                value={filtroEquipo}
                onChange={(e) => setFiltroEquipo(e.target.value)}
              >
                <option value="todos">Todos los equipos</option>
                {equipos.map((equipo) => (
                  <option key={equipo.id} value={equipo.id}>
                    {equipo.nombre}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4">
            {partidosFiltrados.length > 0 ? (
              partidosFiltrados.map((partido) => (
                <div 
                  key={partido.id} 
                  className={`border rounded-lg overflow-hidden ${
                    partido.estado === "Finalizado" 
                      ? "border-gray-200 dark:border-gray-700" 
                      : partido.estado === "En curso" 
                        ? "border-yellow-300 dark:border-yellow-700" 
                        : "border-green-300 dark:border-green-700"
                  }`}
                >
                  <div className={`px-4 py-2 text-sm font-medium ${
                    partido.estado === "Finalizado" 
                      ? "bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300" 
                      : partido.estado === "En curso" 
                        ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200" 
                        : "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                  }`}>
                    {formatearFecha(partido.fecha)} • {partido.hora} • {partido.estado}
                  </div>
                  
                  <div className="p-4">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center">
                        <div className="w-10 h-10 bg-gray-200 dark:bg-gray-700 rounded-full flex items-center justify-center mr-3">
                          <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
                            {partido.local.nombre.substring(0, 2)}
                          </span>
                        </div>
                        <span className="font-medium text-gray-900 dark:text-white">{partido.local.nombre}</span>
                      </div>
                      <div className={`w-10 h-10 flex items-center justify-center font-bold text-lg ${
                        partido.estado !== "Por jugar" 
                          ? "bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white" 
                          : "text-gray-400 dark:text-gray-500"
                      }`}>
                        {partido.golesLocal !== null ? partido.golesLocal : "-"}
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div className="w-10 h-10 bg-gray-200 dark:bg-gray-700 rounded-full flex items-center justify-center mr-3">
                          <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
                            {partido.visitante.nombre.substring(0, 2)}
                          </span>
                        </div>
                        <span className="font-medium text-gray-900 dark:text-white">{partido.visitante.nombre}</span>
                      </div>
                      <div className={`w-10 h-10 flex items-center justify-center font-bold text-lg ${
                        partido.estado !== "Por jugar" 
                          ? "bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white" 
                          : "text-gray-400 dark:text-gray-500"
                      }`}>
                        {partido.golesVisitante !== null ? partido.golesVisitante : "-"}
                      </div>
                    </div>
                    
                    <div className="mt-3 text-sm text-gray-500 dark:text-gray-400">
                      {partido.estadio}, {partido.ciudad}
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="col-span-full text-center py-8 text-gray-500 dark:text-gray-400">
                No hay partidos que coincidan con el filtro seleccionado.
              </div>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
            <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-4">Próximos Partidos Destacados</h2>
            <div className="space-y-4">
              {jornadas.slice(3, 6).flatMap(jornada => 
                jornada.partidos.slice(0, 2).map(partido => (
                  <div key={partido.id} className="border-b border-gray-200 dark:border-gray-700 pb-4 last:border-0">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm text-gray-500 dark:text-gray-400">
                        Jornada {jornada.numero} • {formatearFecha(jornada.fecha)}
                      </span>
                      <span className="text-sm font-medium text-green-600 dark:text-green-400">
                        {partido.hora}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="font-medium text-gray-900 dark:text-white">{partido.local.nombre}</span>
                      <span className="text-gray-500 dark:text-gray-400">vs</span>
                      <span className="font-medium text-gray-900 dark:text-white">{partido.visitante.nombre}</span>
                    </div>
                    <div className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                      {partido.estadio}, {partido.ciudad}
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
            <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-4">Resultados Recientes</h2>
            <div className="space-y-4">
              {jornadas.slice(0, 3).flatMap(jornada => 
                jornada.partidos.slice(0, 2).map(partido => (
                  <div key={partido.id} className="border-b border-gray-200 dark:border-gray-700 pb-4 last:border-0">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm text-gray-500 dark:text-gray-400">
                        Jornada {jornada.numero} • {formatearFecha(jornada.fecha)}
                      </span>
                      <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
                        Finalizado
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <div className="flex items-center">
                        <span className="font-medium text-gray-900 dark:text-white mr-2">{partido.local.nombre}</span>
                        <span className="font-bold text-gray-900 dark:text-white">{partido.golesLocal}</span>
                      </div>
                      <span className="text-xs text-gray-500 dark:text-gray-400 mx-2">-</span>
                      <div className="flex items-center">
                        <span className="font-bold text-gray-900 dark:text-white mr-2">{partido.golesVisitante}</span>
                        <span className="font-medium text-gray-900 dark:text-white">{partido.visitante.nombre}</span>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
