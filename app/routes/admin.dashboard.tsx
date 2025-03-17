import { useLoaderData } from "@remix-run/react";
import type { LoaderFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { equipos } from "~/data/equipos";
import { jugadores } from "~/data/jugadores";
import { partidos, obtenerTablaPosiciones } from "~/data/partidos";
import type { Equipo, Partido, TablaPosicion } from "~/types";

export const loader: LoaderFunction = async () => {
  const tablaPosiciones: TablaPosicion[] = obtenerTablaPosiciones();
  const proximosPartidos: Partido[] = partidos
    .filter((p: Partido) => p.estado === "Programado")
    .sort((a: Partido, b: Partido) => new Date(a.fecha).getTime() - new Date(b.fecha).getTime())
    .slice(0, 5);

  const ultimosPartidos: Partido[] = partidos
    .filter((p: Partido) => p.estado === "Finalizado")
    .sort((a: Partido, b: Partido) => new Date(b.fecha).getTime() - new Date(a.fecha).getTime())
    .slice(0, 5);

  return json({
    totalEquipos: equipos.length,
    totalJugadores: jugadores.length,
    totalPartidos: partidos.length,
    tablaPosiciones,
    proximosPartidos,
    ultimosPartidos,
  });
};

function formatearFecha(fecha: string) {
  return new Date(fecha).toLocaleDateString('es-CO', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
}

export default function AdminDashboard() {
  const {
    totalEquipos,
    totalJugadores,
    totalPartidos,
    tablaPosiciones,
    proximosPartidos,
    ultimosPartidos,
  } = useLoaderData<typeof loader>();

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
        Dashboard
      </h1>

      {/* Estadísticas generales */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
          <div className="flex items-center">
            <div className="p-3 bg-amber-100 dark:bg-amber-900 rounded-full">
              <svg
                className="h-6 w-6 text-amber-600 dark:text-amber-300"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
            </div>
            <div className="ml-4">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                Equipos
              </h2>
              <p className="mt-1 text-3xl font-bold text-amber-600 dark:text-amber-400">
                {totalEquipos}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
          <div className="flex items-center">
            <div className="p-3 bg-amber-100 dark:bg-amber-900 rounded-full">
              <svg
                className="h-6 w-6 text-amber-600 dark:text-amber-300"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                />
              </svg>
            </div>
            <div className="ml-4">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                Jugadores
              </h2>
              <p className="mt-1 text-3xl font-bold text-amber-600 dark:text-amber-400">
                {totalJugadores}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
          <div className="flex items-center">
            <div className="p-3 bg-amber-100 dark:bg-amber-900 rounded-full">
              <svg
                className="h-6 w-6 text-amber-600 dark:text-amber-300"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 21v-4m0 0V5a2 2 0 012-2h6.5l1 1H21l-3 6 3 6h-8.5l-1-1H5a2 2 0 00-2 2zm9-13.5V9"
                />
              </svg>
            </div>
            <div className="ml-4">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                Partidos
              </h2>
              <p className="mt-1 text-3xl font-bold text-amber-600 dark:text-amber-400">
                {totalPartidos}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Tabla de Posiciones y Próximos Partidos */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Tabla de Posiciones */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Tabla de Posiciones
          </h2>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
              <thead className="bg-gray-50 dark:bg-gray-900">
                <tr>
                  <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Pos
                  </th>
                  <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Equipo
                  </th>
                  <th className="px-3 py-2 text-center text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    PJ
                  </th>
                  <th className="px-3 py-2 text-center text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    PTS
                  </th>
                  <th className="px-3 py-2 text-center text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    DG
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                {tablaPosiciones.map((equipo: TablaPosicion, index: number) => {
                  const equipoInfo: Equipo | undefined = equipos.find(e => e.id === equipo.equipoId);
                  return (
                    <tr key={equipo.equipoId}>
                      <td className="px-3 py-2 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                        {index + 1}
                      </td>
                      <td className="px-3 py-2 whitespace-nowrap">
                        <div className="flex items-center">
                          {equipoInfo && (
                            <img
                              src={equipoInfo.escudo}
                              alt={equipoInfo.nombre}
                              className="h-6 w-6 object-contain"
                            />
                          )}
                          <span className="ml-2 text-sm text-gray-900 dark:text-white">
                            {equipoInfo?.nombre}
                          </span>
                        </div>
                      </td>
                      <td className="px-3 py-2 whitespace-nowrap text-sm text-center text-gray-900 dark:text-white">
                        {equipo.partidosJugados}
                      </td>
                      <td className="px-3 py-2 whitespace-nowrap text-sm text-center font-bold text-gray-900 dark:text-white">
                        {equipo.puntos}
                      </td>
                      <td className="px-3 py-2 whitespace-nowrap text-sm text-center text-gray-900 dark:text-white">
                        {equipo.diferenciaGoles}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Próximos Partidos */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Próximos Partidos
          </h2>
          <div className="space-y-4">
            {proximosPartidos.map((partido: Partido) => {
              const local: Equipo | undefined = equipos.find(e => e.id === partido.equipoLocalId);
              const visitante: Equipo | undefined = equipos.find(e => e.id === partido.equipoVisitanteId);
              return (
                <div
                  key={partido.id}
                  className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg"
                >
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center">
                      {local && (
                        <img
                          src={local.escudo}
                          alt={local.nombre}
                          className="h-8 w-8 object-contain"
                        />
                      )}
                      <span className="mx-2 text-sm font-medium text-gray-900 dark:text-white">
                        vs
                      </span>
                      {visitante && (
                        <img
                          src={visitante.escudo}
                          alt={visitante.nombre}
                          className="h-8 w-8 object-contain"
                        />
                      )}
                    </div>
                    <div className="flex flex-col">
                      <span className="text-sm font-medium text-gray-900 dark:text-white">
                        {local?.nombreCorto} vs {visitante?.nombreCorto}
                      </span>
                      <span className="text-xs text-gray-500 dark:text-gray-400">
                        {formatearFecha(partido.fecha)} - {partido.hora}
                      </span>
                    </div>
                  </div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">
                    Jornada {partido.jornada}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Enlaces rápidos */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <a
          href="/admin/equipos"
          className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
        >
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            Gestionar Equipos
          </h3>
          <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
            Agregar, editar o eliminar equipos del torneo
          </p>
        </a>

        <a
          href="/admin/jugadores"
          className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
        >
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            Gestionar Jugadores
          </h3>
          <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
            Administrar la información de los jugadores
          </p>
        </a>

        <a
          href="/admin/partidos"
          className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
        >
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            Gestionar Partidos
          </h3>
          <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
            Programar partidos y registrar resultados
          </p>
        </a>
      </div>
    </div>
  );
}
