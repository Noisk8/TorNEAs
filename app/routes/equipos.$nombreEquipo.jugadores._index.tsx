import { json } from "@remix-run/node";
import { useLoaderData, Link } from "@remix-run/react";
import type { LoaderFunctionArgs } from "@remix-run/node";
import { equipos, generarJugadores, type Jugador, type Equipo } from "~/data/equipos";

export const loader = async ({ params }: LoaderFunctionArgs) => {
  const { nombreEquipo } = params;

  if (!nombreEquipo) {
    throw new Response("Equipo no especificado", { status: 400 });
  }

  const equipo = equipos.find(e => e.nombreCorto.toLowerCase() === nombreEquipo.toLowerCase());
  
  if (!equipo) {
    throw new Response("Equipo no encontrado", { status: 404 });
  }

  const jugadores = generarJugadores(equipo.id);

  return json({ jugadores, equipo });
};

export default function ListaJugadores() {
  const { jugadores, equipo } = useLoaderData<typeof loader>();

  // Agrupar jugadores por posición para mostrarlos organizados como en un equipo real
  const jugadoresPorPosicion = {
    Portero: jugadores.filter(j => j.posicion === "Portero"),
    Defensa: jugadores.filter(j => j.posicion === "Defensa"),
    Mediocampista: jugadores.filter(j => j.posicion === "Mediocampista"),
    Delantero: jugadores.filter(j => j.posicion === "Delantero")
  };

  return (
    <>
      <div className="mb-8">
        <Link 
          to=".."
          className="inline-flex items-center text-green-700 dark:text-green-400 hover:underline"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M9.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L7.414 9H15a1 1 0 110 2H7.414l2.293 2.293a1 1 0 010 1.414z" clipRule="evenodd" />
          </svg>
          Volver al Equipo
        </Link>
      </div>

      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
        Plantilla de {equipo.nombre}
      </h1>

      {Object.entries(jugadoresPorPosicion).map(([posicion, jugadores]) => (
        <div key={posicion} className="mb-8">
          <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">
            {posicion}s
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {jugadores.map((jugador) => (
              <div key={jugador.id} className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
                <Link to={jugador.nombreUrl} className="block">
                  <div className="p-6">
                    <div className="flex items-center mb-4">
                      <div className="w-16 h-16 bg-green-100 dark:bg-green-800 rounded-full flex items-center justify-center mr-4">
                        <span className="text-2xl font-bold text-green-800 dark:text-green-200">
                          {jugador.numero}
                        </span>
                      </div>
                      <div>
                        <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                          {jugador.nombre} {jugador.apellido}
                        </h2>
                        <p className="text-gray-600 dark:text-gray-300">{jugador.posicion}</p>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span className="text-gray-500 dark:text-gray-400">Nacionalidad</span>
                          <span className="text-gray-900 dark:text-white">{jugador.nacionalidad}</span>
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span className="text-gray-500 dark:text-gray-400">Edad</span>
                          <span className="text-gray-900 dark:text-white">{jugador.edad} años</span>
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-500 dark:text-gray-400">Partidos</span>
                          <span className="text-gray-900 dark:text-white">{jugador.partidosJugados}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>
      ))}
    </>
  );
}
