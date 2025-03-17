import { json } from "@remix-run/node";
import { useLoaderData, Link } from "@remix-run/react";
import type { LoaderFunctionArgs, MetaFunction } from "@remix-run/node";
import { equipos, generarJugadores } from "~/data/equipos";

export const meta: MetaFunction = () => {
  return [
    { title: "Detalle de Equipo - TorNEA" },
    { name: "description", content: "Información detallada y plantilla del equipo" },
  ];
};

export const loader = async ({ params }: LoaderFunctionArgs) => {
  const nombreEquipoParam = params.nombreEquipo;
  
  // Encontrar el equipo por nombre corto (URL amigable)
  const equipo = equipos.find(e => e.nombreCorto.toLowerCase() === nombreEquipoParam?.toLowerCase());
  
  if (!equipo) {
    throw new Response("Equipo no encontrado", { status: 404 });
  }

  // Generar jugadores usando el ID del equipo como seed
  const jugadores = generarJugadores(equipo.id);

  // Agrupar jugadores por posición
  const jugadoresPorPosicion = {
    "Portero": jugadores.filter(j => j.posicion === "Portero"),
    "Defensa": jugadores.filter(j => j.posicion === "Defensa"),
    "Mediocampista": jugadores.filter(j => j.posicion === "Mediocampista"),
    "Delantero": jugadores.filter(j => j.posicion === "Delantero"),
  };

  // Calcular estadísticas del equipo
  const estadisticas = {
    goles: jugadores.reduce((sum, j) => sum + j.goles, 0),
    asistencias: jugadores.reduce((sum, j) => sum + j.asistencias, 0),
    tarjetasAmarillas: jugadores.reduce((sum, j) => sum + j.tarjetasAmarillas, 0),
    tarjetasRojas: jugadores.reduce((sum, j) => sum + j.tarjetasRojas, 0),
    partidosJugados: Math.floor(Math.random() * 10) + 5, // Simulado
    victorias: Math.floor(Math.random() * 5) + 1, // Simulado
    empates: Math.floor(Math.random() * 3) + 1, // Simulado
    derrotas: Math.floor(Math.random() * 3) + 1, // Simulado
  };

  return json({ equipo, jugadoresPorPosicion, estadisticas });
};

export default function DetalleEquipo() {
  const { equipo, jugadoresPorPosicion, estadisticas } = useLoaderData<typeof loader>();

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      {/* Hero Section */}
      <div className="relative bg-white dark:bg-gray-800 overflow-hidden">
        <div className="absolute inset-0 team-card-pattern text-gray-800 dark:text-white opacity-10"></div>
        <div className={`absolute inset-0 team-card-${equipo.nombreCorto.toLowerCase()} team-card-bg opacity-80`}></div>
        <div className="container mx-auto px-4 py-16 relative z-10">
          <Link to="/equipos" className="inline-flex items-center text-white hover:text-gray-200 mb-6 transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M9.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L7.414 9H15a1 1 0 110 2H7.414l2.293 2.293a1 1 0 010 1.414z" clipRule="evenodd" />
            </svg>
            Volver a Equipos
          </Link>
          
          <div className="flex flex-col md:flex-row items-center md:items-start">
            <div className="w-32 h-32 bg-white rounded-full flex items-center justify-center mb-6 md:mb-0 md:mr-8 shadow-xl border-4 border-white overflow-hidden">
              {equipo.logo ? (
                <img 
                  src={equipo.logo} 
                  alt={`Logo de ${equipo.nombre}`}
                  className="w-full h-full object-contain"
                />
              ) : (
                <span className="text-4xl font-bold text-gray-800">
                  {equipo.nombre.substring(0, 2)}
                </span>
              )}
            </div>
            <div className="text-center md:text-left">
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-2">{equipo.nombre}</h1>
              <p className="text-xl text-white/80 mb-4">{equipo.ciudad}</p>
              <div className="flex flex-wrap justify-center md:justify-start gap-4 mt-4">
                <span className="px-3 py-1 bg-white bg-opacity-20 rounded-full text-white text-sm">
                  Fundado en {equipo.fundacion}
                </span>
                <span className="px-3 py-1 bg-white bg-opacity-20 rounded-full text-white text-sm">
                  Estadio: {equipo.estadio}
                </span>
                <span className="px-3 py-1 bg-white bg-opacity-20 rounded-full text-white text-sm">
                  DT: {equipo.entrenador}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Estadísticas del equipo */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6 border-b border-gray-200 dark:border-gray-700 pb-2">
            Estadísticas del Equipo
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 transform hover:scale-105 transition-transform relative overflow-hidden group">
              <div className="team-card-pattern text-gray-800 dark:text-white opacity-0 group-hover:opacity-5 transition-opacity absolute inset-0"></div>
              <div className="flex items-center relative z-10">
                <div className={`p-3 rounded-full bg-green-100 dark:bg-green-900 text-green-600 dark:text-green-400 mr-4 group-hover:bg-green-600 group-hover:text-white transition-colors`}>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400 group-hover:text-green-600 dark:group-hover:text-green-400 transition-colors">Victorias</p>
                  <p className="text-2xl font-bold text-gray-800 dark:text-white">{estadisticas.victorias}</p>
                </div>
              </div>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 transform hover:scale-105 transition-transform relative overflow-hidden group">
              <div className="team-card-pattern text-gray-800 dark:text-white opacity-0 group-hover:opacity-5 transition-opacity absolute inset-0"></div>
              <div className="flex items-center relative z-10">
                <div className={`p-3 rounded-full bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400 mr-4 group-hover:bg-blue-600 group-hover:text-white transition-colors`}>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">Empates</p>
                  <p className="text-2xl font-bold text-gray-800 dark:text-white">{estadisticas.empates}</p>
                </div>
              </div>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 transform hover:scale-105 transition-transform relative overflow-hidden group">
              <div className="team-card-pattern text-gray-800 dark:text-white opacity-0 group-hover:opacity-5 transition-opacity absolute inset-0"></div>
              <div className="flex items-center relative z-10">
                <div className={`p-3 rounded-full bg-red-100 dark:bg-red-900 text-red-600 dark:text-red-400 mr-4 group-hover:bg-red-600 group-hover:text-white transition-colors`}>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400 group-hover:text-red-600 dark:group-hover:text-red-400 transition-colors">Derrotas</p>
                  <p className="text-2xl font-bold text-gray-800 dark:text-white">{estadisticas.derrotas}</p>
                </div>
              </div>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 transform hover:scale-105 transition-transform relative overflow-hidden group">
              <div className="team-card-pattern text-gray-800 dark:text-white opacity-0 group-hover:opacity-5 transition-opacity absolute inset-0"></div>
              <div className="flex items-center relative z-10">
                <div className={`p-3 rounded-full bg-indigo-100 dark:bg-indigo-900 text-indigo-600 dark:text-indigo-400 mr-4 group-hover:bg-indigo-600 group-hover:text-white transition-colors`}>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">Goles</p>
                  <p className="text-2xl font-bold text-gray-800 dark:text-white">{estadisticas.goles}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Descripción del equipo */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 mb-12 relative overflow-hidden group">
          <div className="team-card-pattern text-gray-800 dark:text-white opacity-0 group-hover:opacity-5 transition-opacity absolute inset-0"></div>
          <div className={`absolute top-0 left-0 w-1 h-full team-card-${equipo.nombreCorto.toLowerCase()} team-card-bg`}></div>
          <div className="relative z-10">
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">Sobre el Equipo</h2>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">{equipo.descripcion}</p>
          </div>
        </div>

        {/* Plantilla */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white">Plantilla</h2>
            <Link
              to={`/equipos/${equipo.nombreCorto}/jugador`}
              className={`inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white transition-colors team-card-${equipo.nombreCorto.toLowerCase()} team-card-bg hover:opacity-90`}
            >
              Ver Plantilla Completa
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-1" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </Link>
          </div>

          {Object.entries(jugadoresPorPosicion).map(([posicion, jugadoresPosicion]) => (
            <div key={posicion} className="mb-8">
              <h3 className="text-xl font-semibold text-gray-700 dark:text-gray-300 mb-4 flex items-center">
                <span className={`w-2 h-2 team-card-${equipo.nombreCorto.toLowerCase()} team-card-bg rounded-full mr-2`}></span>
                {posicion}s
              </h3>
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden relative group">
                <div className="team-card-pattern text-gray-800 dark:text-white opacity-0 group-hover:opacity-5 transition-opacity absolute inset-0"></div>
                <div className="overflow-x-auto relative z-10">
                  <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                    <thead className="bg-gray-50 dark:bg-gray-900">
                      <tr>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                          #
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                          Jugador
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                          Nacionalidad
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                          Edad
                        </th>
                        <th scope="col" className="px-6 py-3 text-center text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                          Goles
                        </th>
                        <th scope="col" className="px-6 py-3 text-center text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                          Asist.
                        </th>
                        <th scope="col" className="px-6 py-3 text-center text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                          TA
                        </th>
                        <th scope="col" className="px-6 py-3 text-center text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                          TR
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                      {jugadoresPosicion.map((jugador) => (
                        <tr key={jugador.id} className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                            {jugador.numero}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <div className={`flex-shrink-0 h-10 w-10 team-card-${equipo.nombreCorto.toLowerCase()} team-card-bg bg-opacity-10 dark:bg-opacity-20 rounded-full flex items-center justify-center`}>
                                <span className="text-xs font-medium text-gray-700 dark:text-gray-300">
                                  {jugador.nombre[0]}{jugador.apellido[0]}
                                </span>
                              </div>
                              <div className="ml-4">
                                <div className="text-sm font-medium text-gray-900 dark:text-white">
                                  <Link to={`/equipos/${equipo.nombreCorto}/jugador/${jugador.nombreUrl}`} prefetch="intent" className={`hover:text-red-600 dark:hover:text-red-400 transition-colors`}>
                                    {jugador.nombre} {jugador.apellido}
                                  </Link>
                                </div>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                            {jugador.nacionalidad}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                            {jugador.edad}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-gray-500 dark:text-gray-300">
                            <span className={`${jugador.goles > 0 ? 'text-green-600 dark:text-green-400 font-medium' : ''}`}>
                              {jugador.goles}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-gray-500 dark:text-gray-300">
                            <span className={`${jugador.asistencias > 0 ? 'text-blue-600 dark:text-blue-400 font-medium' : ''}`}>
                              {jugador.asistencias}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-gray-500 dark:text-gray-300">
                            <span className={`${jugador.tarjetasAmarillas > 0 ? 'text-yellow-600 dark:text-yellow-400 font-medium' : ''}`}>
                              {jugador.tarjetasAmarillas}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-gray-500 dark:text-gray-300">
                            <span className={`${jugador.tarjetasRojas > 0 ? 'text-red-600 dark:text-red-400 font-medium' : ''}`}>
                              {jugador.tarjetasRojas}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
