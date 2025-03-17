import { json } from "@remix-run/node";
import { useLoaderData, Link } from "@remix-run/react";
import type { LoaderFunctionArgs, MetaFunction } from "@remix-run/node";
import { equipos, generarJugadores, type Jugador, type Equipo } from "~/data/equipos";

export const meta: MetaFunction<typeof loader> = ({ data }) => {
  if (!data) {
    return [
      { title: "Jugador no encontrado - TorNEA" },
      { name: "description", content: "El jugador solicitado no fue encontrado" },
    ];
  }

  const { jugador, equipo } = data;
  return [
    { title: `${jugador.nombre} ${jugador.apellido} - ${equipo.nombre} - TorNEA` },
    { name: "description", content: `Estadísticas y perfil de ${jugador.nombre} ${jugador.apellido}, jugador de ${equipo.nombre}` },
  ];
};

export const loader = async ({ params }: LoaderFunctionArgs) => {
  const { nombreEquipo, nombreJugador } = params;

  if (!nombreEquipo || !nombreJugador) {
    throw new Response("Parámetros no válidos", { status: 400 });
  }

  const equipo = equipos.find(e => e.nombreCorto.toLowerCase() === nombreEquipo.toLowerCase());
  
  if (!equipo) {
    throw new Response("Equipo no encontrado", { status: 404 });
  }

  const jugadores = generarJugadores(equipo.id);
  const jugador = jugadores.find(j => j.nombreUrl.toLowerCase() === nombreJugador.toLowerCase());

  if (!jugador) {
    throw new Response("Jugador no encontrado", { status: 404 });
  }

  return json({ jugador, equipo });
};

export default function FichaJugador() {
  const { jugador, equipo } = useLoaderData<typeof loader>();

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-indigo-50 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 py-8">
        {/* Header con navegación */}
        <div className="mb-8 flex justify-between items-center">
          <Link 
            to={`/equipos/${equipo.nombreCorto}`}
            className="inline-flex items-center text-indigo-700 dark:text-indigo-400 hover:underline"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M9.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L7.414 9H15a1 1 0 110 2H7.414l2.293 2.293a1 1 0 010 1.414z" clipRule="evenodd" />
            </svg>
            Volver a {equipo.nombre}
          </Link>
          <div className="text-sm text-gray-500 dark:text-gray-400">
            Temporada 2024-2025
          </div>
        </div>

        {/* Hero section */}
        <div className="relative bg-gradient-to-r from-indigo-600 to-purple-600 rounded-xl overflow-hidden mb-10 shadow-xl">
          <div className="absolute inset-0 bg-opacity-50 bg-black"></div>
          <div className="relative z-10 md:flex items-center p-8">
            <div className="md:w-1/3 flex flex-col items-center justify-center mb-6 md:mb-0">
              <div className="w-40 h-40 bg-white rounded-full flex items-center justify-center mb-4 shadow-lg">
                <span className="text-6xl font-bold text-indigo-700">
                  {jugador.numero}
                </span>
              </div>
              <div className="bg-white/90 px-6 py-2 rounded-full">
                <span className="text-indigo-800 font-medium">{jugador.posicion}</span>
              </div>
            </div>
            <div className="md:w-2/3 text-white">
              <h1 className="text-4xl md:text-5xl font-bold mb-2">
                {jugador.nombre} {jugador.apellido}
              </h1>
              <div className="flex items-center mb-4">
                <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center mr-2">
                  <span className="text-xs font-bold text-indigo-700">{equipo.nombre.substring(0, 2)}</span>
                </div>
                <span className="text-xl">{equipo.nombre}</span>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-white/90">
                <div>
                  <div className="text-sm opacity-75">Nacionalidad</div>
                  <div className="font-semibold">{jugador.nacionalidad}</div>
                </div>
                <div>
                  <div className="text-sm opacity-75">Edad</div>
                  <div className="font-semibold">{jugador.edad} años</div>
                </div>
                <div>
                  <div className="text-sm opacity-75">Altura</div>
                  <div className="font-semibold">{jugador.altura} m</div>
                </div>
                <div>
                  <div className="text-sm opacity-75">Peso</div>
                  <div className="font-semibold">{jugador.peso} kg</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Estadísticas principales */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 flex flex-col items-center">
            <div className="text-5xl font-bold text-indigo-600 dark:text-indigo-400 mb-2">{jugador.goles}</div>
            <div className="text-gray-500 dark:text-gray-400 text-center">Goles</div>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 flex flex-col items-center">
            <div className="text-5xl font-bold text-indigo-600 dark:text-indigo-400 mb-2">{jugador.asistencias}</div>
            <div className="text-gray-500 dark:text-gray-400 text-center">Asistencias</div>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 flex flex-col items-center">
            <div className="text-5xl font-bold text-indigo-600 dark:text-indigo-400 mb-2">{jugador.partidosJugados}</div>
            <div className="text-gray-500 dark:text-gray-400 text-center">Partidos</div>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 flex flex-col items-center">
            <div className="text-5xl font-bold text-indigo-600 dark:text-indigo-400 mb-2">{jugador.minutos}</div>
            <div className="text-gray-500 dark:text-gray-400 text-center">Minutos</div>
          </div>
        </div>

        {/* Estadísticas detalladas */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6">
            <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-6 flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-indigo-600 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 8v8m-4-5v5m-4-2v2m-2 4h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              Estadísticas Ofensivas
            </h2>
            <div className="space-y-6">
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Goles</span>
                  <span className="text-sm font-medium text-indigo-600 dark:text-indigo-400">{jugador.goles}</span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
                  <div 
                    className="bg-indigo-600 dark:bg-indigo-500 h-2.5 rounded-full" 
                    style={{ width: `${(jugador.goles / 15) * 100}%` }}
                  ></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Asistencias</span>
                  <span className="text-sm font-medium text-indigo-600 dark:text-indigo-400">{jugador.asistencias}</span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
                  <div 
                    className="bg-indigo-600 dark:bg-indigo-500 h-2.5 rounded-full" 
                    style={{ width: `${(jugador.asistencias / 10) * 100}%` }}
                  ></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Precisión de Pases</span>
                  <span className="text-sm font-medium text-indigo-600 dark:text-indigo-400">{85 + (jugador.id % 10)}%</span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
                  <div 
                    className="bg-indigo-600 dark:bg-indigo-500 h-2.5 rounded-full" 
                    style={{ width: `${85 + (jugador.id % 10)}%` }}
                  ></div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6">
            <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-6 flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-indigo-600 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
              Disciplina
            </h2>
            <div className="space-y-6">
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Tarjetas Amarillas</span>
                  <span className="text-sm font-medium text-yellow-500">{jugador.tarjetasAmarillas}</span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
                  <div 
                    className="bg-yellow-400 h-2.5 rounded-full" 
                    style={{ width: `${(jugador.tarjetasAmarillas / 10) * 100}%` }}
                  ></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Tarjetas Rojas</span>
                  <span className="text-sm font-medium text-red-500">{jugador.tarjetasRojas}</span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
                  <div 
                    className="bg-red-500 h-2.5 rounded-full" 
                    style={{ width: `${(jugador.tarjetasRojas / 3) * 100}%` }}
                  ></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Faltas Cometidas</span>
                  <span className="text-sm font-medium text-indigo-600 dark:text-indigo-400">{jugador.edad + jugador.numero}</span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
                  <div 
                    className="bg-indigo-600 dark:bg-indigo-500 h-2.5 rounded-full" 
                    style={{ width: `${((jugador.edad + jugador.numero) / 50) * 100}%` }}
                  ></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Últimos partidos */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 mb-10">
          <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-6 flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-indigo-600 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            Últimos Partidos
          </h2>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
              <thead className="bg-gray-50 dark:bg-gray-900">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Fecha
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Rival
                  </th>
                  <th scope="col" className="px-6 py-3 text-center text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Resultado
                  </th>
                  <th scope="col" className="px-6 py-3 text-center text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Minutos
                  </th>
                  <th scope="col" className="px-6 py-3 text-center text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Goles
                  </th>
                  <th scope="col" className="px-6 py-3 text-center text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Asist.
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                {[...Array(5)].map((_, i) => {
                  const randomGoals = Math.floor(Math.random() * 2);
                  const randomAssists = Math.floor(Math.random() * 2);
                  const randomTeam = equipos.filter(e => e.id !== equipo.id)[i % (equipos.length - 1)];
                  const isWin = Math.random() > 0.5;
                  
                  return (
                    <tr key={i} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                        {new Date(2025, 2, 15 - i * 7).toLocaleDateString('es-CO', {day: '2-digit', month: '2-digit', year: 'numeric'})}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-8 w-8 bg-gray-200 dark:bg-gray-700 rounded-full flex items-center justify-center">
                            <span className="text-xs font-medium text-gray-500 dark:text-gray-400">
                              {randomTeam.nombre.substring(0, 2)}
                            </span>
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900 dark:text-white">
                              {randomTeam.nombre}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-center">
                        <span className={`px-2 py-1 rounded-full text-xs font-semibold ${isWin ? 'bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-100' : 'bg-red-100 text-red-800 dark:bg-red-800 dark:text-red-100'}`}>
                          {isWin ? `${2 + Math.floor(Math.random() * 3)}-${Math.floor(Math.random() * 2)}` : `${Math.floor(Math.random() * 2)}-${2 + Math.floor(Math.random() * 2)}`}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-gray-500 dark:text-gray-300">
                        {70 + Math.floor(Math.random() * 21)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-gray-500 dark:text-gray-300">
                        {randomGoals}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-gray-500 dark:text-gray-300">
                        {randomAssists}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Footer con acciones */}
        <div className="flex justify-center space-x-4">
          <Link
            to={`/equipos/${equipo.nombreCorto}`}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Ver Equipo Completo
          </Link>
          <Link
            to="/equipos"
            className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md shadow-sm text-gray-700 dark:text-white bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Todos los Equipos
          </Link>
        </div>
      </div>
    </div>
  );
}
