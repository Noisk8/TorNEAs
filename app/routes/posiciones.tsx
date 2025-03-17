import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import type { MetaFunction } from "@remix-run/node";

export const meta: MetaFunction = () => {
  return [
    { title: "Tabla de Posiciones - TorNEA" },
    { name: "description", content: "Consulta la tabla de posiciones del torneo de fútbol TorNEA" },
  ];
};

// Simulamos datos de la tabla de posiciones
// En una implementación real, estos datos vendrían de la API en Go
export const loader = async () => {
  const equipos = [
    { id: 1, nombre: "Atlético Nacional", puntos: 25, pj: 10, pg: 8, pe: 1, pp: 1, gf: 20, gc: 5, dif: 15 },
    { id: 2, nombre: "Independiente Medellín", puntos: 22, pj: 10, pg: 7, pe: 1, pp: 2, gf: 18, gc: 8, dif: 10 },
    { id: 3, nombre: "América de Cali", puntos: 20, pj: 10, pg: 6, pe: 2, pp: 2, gf: 15, gc: 7, dif: 8 },
    { id: 4, nombre: "Millonarios FC", puntos: 19, pj: 10, pg: 6, pe: 1, pp: 3, gf: 14, gc: 9, dif: 5 },
    { id: 5, nombre: "Junior FC", puntos: 17, pj: 10, pg: 5, pe: 2, pp: 3, gf: 12, gc: 10, dif: 2 },
    { id: 6, nombre: "Deportivo Cali", puntos: 16, pj: 10, pg: 5, pe: 1, pp: 4, gf: 13, gc: 12, dif: 1 },
    { id: 7, nombre: "Independiente Santa Fe", puntos: 15, pj: 10, pg: 4, pe: 3, pp: 3, gf: 11, gc: 10, dif: 1 },
    { id: 8, nombre: "Envigado FC", puntos: 14, pj: 10, pg: 4, pe: 2, pp: 4, gf: 9, gc: 10, dif: -1 },
    { id: 9, nombre: "La Equidad", puntos: 13, pj: 10, pg: 3, pe: 4, pp: 3, gf: 8, gc: 9, dif: -1 },
    { id: 10, nombre: "Once Caldas", puntos: 12, pj: 10, pg: 3, pe: 3, pp: 4, gf: 9, gc: 11, dif: -2 },
    { id: 11, nombre: "Deportes Tolima", puntos: 11, pj: 10, pg: 3, pe: 2, pp: 5, gf: 7, gc: 10, dif: -3 },
    { id: 12, nombre: "Jaguares de Córdoba", puntos: 10, pj: 10, pg: 2, pe: 4, pp: 4, gf: 6, gc: 9, dif: -3 },
    { id: 13, nombre: "Águilas Doradas", puntos: 9, pj: 10, pg: 2, pe: 3, pp: 5, gf: 7, gc: 12, dif: -5 },
    { id: 14, nombre: "Deportivo Pasto", puntos: 8, pj: 10, pg: 2, pe: 2, pp: 6, gf: 5, gc: 11, dif: -6 },
    { id: 15, nombre: "Patriotas Boyacá", puntos: 6, pj: 10, pg: 1, pe: 3, pp: 6, gf: 4, gc: 13, dif: -9 },
    { id: 16, nombre: "Boyacá Chicó", puntos: 4, pj: 10, pg: 1, pe: 1, pp: 8, gf: 3, gc: 15, dif: -12 },
  ];

  return json({ equipos });
};

export default function Posiciones() {
  const { equipos } = useLoaderData<typeof loader>();

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-green-100 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 py-8">
        <header className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-green-700 dark:text-green-500 mb-2">
            Tabla de Posiciones
          </h1>
          <p className="text-gray-600 dark:text-gray-300">
            Clasificación actualizada del Torneo TorNEA
          </p>
        </header>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead>
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Pos</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Equipo</th>
                <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">PJ</th>
                <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">PG</th>
                <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">PE</th>
                <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">PP</th>
                <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">GF</th>
                <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">GC</th>
                <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">DIF</th>
                <th className="px-4 py-3 text-center text-xs font-bold text-gray-500 dark:text-gray-300 uppercase tracking-wider">PTS</th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
              {equipos.map((equipo, index) => (
                <tr key={equipo.id} className={index % 2 === 0 ? 'bg-gray-50 dark:bg-gray-900/50' : ''}>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className={`
                        flex items-center justify-center w-6 h-6 rounded-full text-xs font-medium
                        ${index < 4 ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' : 
                          index < 8 ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200' : 
                          index > 12 ? 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200' : 
                          'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200'}
                      `}>
                        {index + 1}
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900 dark:text-white">{equipo.nombre}</div>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-center text-sm text-gray-500 dark:text-gray-300">{equipo.pj}</td>
                  <td className="px-4 py-3 whitespace-nowrap text-center text-sm text-gray-500 dark:text-gray-300">{equipo.pg}</td>
                  <td className="px-4 py-3 whitespace-nowrap text-center text-sm text-gray-500 dark:text-gray-300">{equipo.pe}</td>
                  <td className="px-4 py-3 whitespace-nowrap text-center text-sm text-gray-500 dark:text-gray-300">{equipo.pp}</td>
                  <td className="px-4 py-3 whitespace-nowrap text-center text-sm text-gray-500 dark:text-gray-300">{equipo.gf}</td>
                  <td className="px-4 py-3 whitespace-nowrap text-center text-sm text-gray-500 dark:text-gray-300">{equipo.gc}</td>
                  <td className="px-4 py-3 whitespace-nowrap text-center text-sm text-gray-500 dark:text-gray-300">{equipo.dif}</td>
                  <td className="px-4 py-3 whitespace-nowrap text-center text-sm font-bold text-gray-900 dark:text-white">{equipo.puntos}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-8 bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
          <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-4">Referencias</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="flex items-center">
              <div className="w-4 h-4 rounded-full bg-green-100 dark:bg-green-900 mr-2"></div>
              <span className="text-sm text-gray-600 dark:text-gray-300">Clasificación a fase final</span>
            </div>
            <div className="flex items-center">
              <div className="w-4 h-4 rounded-full bg-blue-100 dark:bg-blue-900 mr-2"></div>
              <span className="text-sm text-gray-600 dark:text-gray-300">Clasificación a torneo internacional</span>
            </div>
            <div className="flex items-center">
              <div className="w-4 h-4 rounded-full bg-gray-100 dark:bg-gray-700 mr-2"></div>
              <span className="text-sm text-gray-600 dark:text-gray-300">Zona media</span>
            </div>
            <div className="flex items-center">
              <div className="w-4 h-4 rounded-full bg-red-100 dark:bg-red-900 mr-2"></div>
              <span className="text-sm text-gray-600 dark:text-gray-300">Zona de descenso</span>
            </div>
          </div>
        </div>

        <div className="mt-8 bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
          <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-4">Estadísticas del Torneo</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-green-50 dark:bg-green-900/30 p-4 rounded-lg">
              <h3 className="text-lg font-semibold text-green-800 dark:text-green-300 mb-2">Mejor Ataque</h3>
              <div className="flex items-center justify-between">
                <span className="text-gray-700 dark:text-gray-300">Atlético Nacional</span>
                <span className="font-bold text-green-700 dark:text-green-400">20 goles</span>
              </div>
            </div>
            <div className="bg-blue-50 dark:bg-blue-900/30 p-4 rounded-lg">
              <h3 className="text-lg font-semibold text-blue-800 dark:text-blue-300 mb-2">Mejor Defensa</h3>
              <div className="flex items-center justify-between">
                <span className="text-gray-700 dark:text-gray-300">Atlético Nacional</span>
                <span className="font-bold text-blue-700 dark:text-blue-400">5 goles</span>
              </div>
            </div>
            <div className="bg-yellow-50 dark:bg-yellow-900/30 p-4 rounded-lg">
              <h3 className="text-lg font-semibold text-yellow-800 dark:text-yellow-300 mb-2">Más Victorias</h3>
              <div className="flex items-center justify-between">
                <span className="text-gray-700 dark:text-gray-300">Atlético Nacional</span>
                <span className="font-bold text-yellow-700 dark:text-yellow-400">8 victorias</span>
              </div>
            </div>
            <div className="bg-purple-50 dark:bg-purple-900/30 p-4 rounded-lg">
              <h3 className="text-lg font-semibold text-purple-800 dark:text-purple-300 mb-2">Menos Derrotas</h3>
              <div className="flex items-center justify-between">
                <span className="text-gray-700 dark:text-gray-300">Atlético Nacional</span>
                <span className="font-bold text-purple-700 dark:text-purple-400">1 derrota</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
