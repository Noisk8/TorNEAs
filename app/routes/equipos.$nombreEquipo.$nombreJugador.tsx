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
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-green-100 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 py-8">
        <Link 
          to={`/equipos/${equipo.nombreCorto}`}
          className="inline-flex items-center text-green-700 dark:text-green-400 hover:underline mb-6"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M9.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L7.414 9H15a1 1 0 110 2H7.414l2.293 2.293a1 1 0 010 1.414z" clipRule="evenodd" />
          </svg>
          Volver a {equipo.nombre.replace(/-/g, ' ')}
        </Link>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden mb-8">
          <div className="md:flex">
            <div className="md:w-1/3 bg-gray-100 dark:bg-gray-700 p-6 flex flex-col items-center justify-center">
              <div className="w-32 h-32 bg-green-100 dark:bg-green-800 rounded-full flex items-center justify-center mb-4">
                <span className="text-4xl font-bold text-green-800 dark:text-green-200">
                  {jugador.numero}
                </span>
              </div>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white text-center mb-2">
                {jugador.nombre} {jugador.apellido}
              </h1>
              <p className="text-gray-600 dark:text-gray-300 text-center">{jugador.posicion}</p>
            </div>
            <div className="md:w-2/3 p-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Nacionalidad</h3>
                  <p className="text-lg text-gray-900 dark:text-white">{jugador.nacionalidad}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Edad</h3>
                  <p className="text-lg text-gray-900 dark:text-white">{jugador.edad} años</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Altura</h3>
                  <p className="text-lg text-gray-900 dark:text-white">{jugador.altura} m</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Peso</h3>
                  <p className="text-lg text-gray-900 dark:text-white">{jugador.peso} kg</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
            <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-4">Estadísticas de la Temporada</h2>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium text-gray-500 dark:text-gray-400">Partidos Jugados</span>
                  <span className="text-sm font-medium text-gray-900 dark:text-white">{jugador.partidosJugados}</span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                  <div 
                    className="bg-blue-600 dark:bg-blue-500 h-2 rounded-full" 
                    style={{ width: `${(jugador.partidosJugados / 20) * 100}%` }}
                  ></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium text-gray-500 dark:text-gray-400">Goles</span>
                  <span className="text-sm font-medium text-gray-900 dark:text-white">{jugador.goles}</span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                  <div 
                    className="bg-green-600 dark:bg-green-500 h-2 rounded-full" 
                    style={{ width: `${(jugador.goles / 15) * 100}%` }}
                  ></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium text-gray-500 dark:text-gray-400">Asistencias</span>
                  <span className="text-sm font-medium text-gray-900 dark:text-white">{jugador.asistencias}</span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                  <div 
                    className="bg-yellow-600 dark:bg-yellow-500 h-2 rounded-full" 
                    style={{ width: `${(jugador.asistencias / 10) * 100}%` }}
                  ></div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
            <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-4">Disciplina</h2>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium text-gray-500 dark:text-gray-400">Minutos Jugados</span>
                  <span className="text-sm font-medium text-gray-900 dark:text-white">{jugador.minutos}</span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                  <div 
                    className="bg-purple-600 dark:bg-purple-500 h-2 rounded-full" 
                    style={{ width: `${(jugador.minutos / 1800) * 100}%` }}
                  ></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium text-gray-500 dark:text-gray-400">Tarjetas Amarillas</span>
                  <span className="text-sm font-medium text-gray-900 dark:text-white">{jugador.tarjetasAmarillas}</span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                  <div 
                    className="bg-yellow-400 dark:bg-yellow-500 h-2 rounded-full" 
                    style={{ width: `${(jugador.tarjetasAmarillas / 10) * 100}%` }}
                  ></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium text-gray-500 dark:text-gray-400">Tarjetas Rojas</span>
                  <span className="text-sm font-medium text-gray-900 dark:text-white">{jugador.tarjetasRojas}</span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                  <div 
                    className="bg-red-600 dark:bg-red-500 h-2 rounded-full" 
                    style={{ width: `${(jugador.tarjetasRojas / 3) * 100}%` }}
                  ></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
