import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import type { MetaFunction } from "@remix-run/node";

export const meta: MetaFunction = () => {
  return [
    { title: "Tabla de Goleadores - TorNEA" },
    { name: "description", content: "Consulta la tabla de goleadores del torneo de fútbol TorNEA" },
  ];
};

// Simulamos datos de los goleadores
// En una implementación real, estos datos vendrían de la API en Go
export const loader = async () => {
  const goleadores = [
    { id: 1, nombre: "Carlos Bacca", equipo: "Junior FC", goles: 12, penales: 3, asistencias: 5, partidos: 10, foto: "/jugadores/carlos-bacca.png" },
    { id: 2, nombre: "Dayro Moreno", equipo: "Once Caldas", goles: 10, penales: 4, asistencias: 2, partidos: 10, foto: "/jugadores/dayro-moreno.png" },
    { id: 3, nombre: "Hugo Rodallega", equipo: "Independiente Santa Fe", goles: 9, penales: 2, asistencias: 3, partidos: 9, foto: "/jugadores/hugo-rodallega.png" },
    { id: 4, nombre: "Juan Fernando Caicedo", equipo: "Deportivo Cali", goles: 8, penales: 1, asistencias: 4, partidos: 10, foto: "/jugadores/juan-caicedo.png" },
    { id: 5, nombre: "Andrés Rentería", equipo: "América de Cali", goles: 7, penales: 0, asistencias: 6, partidos: 10, foto: "/jugadores/andres-renteria.png" },
    { id: 6, nombre: "Leonardo Castro", equipo: "Millonarios FC", goles: 7, penales: 1, asistencias: 2, partidos: 9, foto: "/jugadores/leonardo-castro.png" },
    { id: 7, nombre: "Jefferson Duque", equipo: "Atlético Nacional", goles: 6, penales: 2, asistencias: 3, partidos: 10, foto: "/jugadores/jefferson-duque.png" },
    { id: 8, nombre: "Agustín Palavecino", equipo: "Deportivo Cali", goles: 6, penales: 0, asistencias: 7, partidos: 10, foto: "/jugadores/agustin-palavecino.png" },
    { id: 9, nombre: "Marco Pérez", equipo: "Deportes Tolima", goles: 5, penales: 1, asistencias: 2, partidos: 9, foto: "/jugadores/marco-perez.png" },
    { id: 10, nombre: "Jader Durán", equipo: "Envigado FC", goles: 5, penales: 0, asistencias: 1, partidos: 10, foto: "/jugadores/jader-duran.png" },
    { id: 11, nombre: "Cristian Arango", equipo: "Millonarios FC", goles: 5, penales: 2, asistencias: 4, partidos: 8, foto: "/jugadores/cristian-arango.png" },
    { id: 12, nombre: "Matías Mier", equipo: "La Equidad", goles: 4, penales: 0, asistencias: 5, partidos: 10, foto: "/jugadores/matias-mier.png" },
    { id: 13, nombre: "Andrés Andrade", equipo: "Atlético Nacional", goles: 4, penales: 1, asistencias: 6, partidos: 9, foto: "/jugadores/andres-andrade.png" },
    { id: 14, nombre: "Jhon Córdoba", equipo: "Deportivo Pasto", goles: 4, penales: 0, asistencias: 1, partidos: 10, foto: "/jugadores/jhon-cordoba.png" },
    { id: 15, nombre: "Jáder Obrian", equipo: "Águilas Doradas", goles: 4, penales: 1, asistencias: 2, partidos: 9, foto: "/jugadores/jader-obrian.png" },
    { id: 16, nombre: "Diber Cambindo", equipo: "Independiente Medellín", goles: 3, penales: 0, asistencias: 4, partidos: 10, foto: "/jugadores/diber-cambindo.png" },
    { id: 17, nombre: "Fabián Sambueza", equipo: "Junior FC", goles: 3, penales: 0, asistencias: 7, partidos: 10, foto: "/jugadores/fabian-sambueza.png" },
    { id: 18, nombre: "Andrés Mosquera", equipo: "Patriotas Boyacá", goles: 3, penales: 1, asistencias: 0, partidos: 9, foto: "/jugadores/andres-mosquera.png" },
    { id: 19, nombre: "Sebastián Guzmán", equipo: "Jaguares de Córdoba", goles: 3, penales: 0, asistencias: 2, partidos: 10, foto: "/jugadores/sebastian-guzman.png" },
    { id: 20, nombre: "Jhon Vásquez", equipo: "Boyacá Chicó", goles: 2, penales: 0, asistencias: 1, partidos: 8, foto: "/jugadores/jhon-vasquez.png" },
  ];

  return json({ goleadores });
};

export default function Goleadores() {
  const { goleadores } = useLoaderData<typeof loader>();

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-green-100 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 py-8">
        <header className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-green-700 dark:text-green-500 mb-2">
            Tabla de Goleadores
          </h1>
          <p className="text-gray-600 dark:text-gray-300">
            Los máximos anotadores del Torneo TorNEA
          </p>
        </header>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead>
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Pos</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Jugador</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Equipo</th>
                <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">PJ</th>
                <th className="px-4 py-3 text-center text-xs font-bold text-gray-500 dark:text-gray-300 uppercase tracking-wider">Goles</th>
                <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Penales</th>
                <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Asist.</th>
                <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Prom.</th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
              {goleadores.map((goleador, index) => (
                <tr key={goleador.id} className={index % 2 === 0 ? 'bg-gray-50 dark:bg-gray-900/50' : ''}>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className={`
                        flex items-center justify-center w-6 h-6 rounded-full text-xs font-medium
                        ${index < 3 ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200' : 
                          index < 10 ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200' : 
                          'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200'}
                      `}>
                        {index + 1}
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="w-8 h-8 bg-gray-200 dark:bg-gray-700 rounded-full flex items-center justify-center mr-3">
                        <span className="text-xs font-medium text-gray-500 dark:text-gray-400">
                          {goleador.nombre.split(' ').map(name => name[0]).join('')}
                        </span>
                      </div>
                      <div className="text-sm font-medium text-gray-900 dark:text-white">{goleador.nombre}</div>
                    </div>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <div className="text-sm text-gray-500 dark:text-gray-300">{goleador.equipo}</div>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-center text-sm text-gray-500 dark:text-gray-300">{goleador.partidos}</td>
                  <td className="px-4 py-3 whitespace-nowrap text-center text-sm font-bold text-gray-900 dark:text-white">{goleador.goles}</td>
                  <td className="px-4 py-3 whitespace-nowrap text-center text-sm text-gray-500 dark:text-gray-300">{goleador.penales}</td>
                  <td className="px-4 py-3 whitespace-nowrap text-center text-sm text-gray-500 dark:text-gray-300">{goleador.asistencias}</td>
                  <td className="px-4 py-3 whitespace-nowrap text-center text-sm text-gray-500 dark:text-gray-300">
                    {(goleador.goles / goleador.partidos).toFixed(2)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
            <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-4">Máximo Goleador</h2>
            <div className="flex flex-col items-center">
              <div className="w-24 h-24 bg-yellow-100 dark:bg-yellow-900 rounded-full flex items-center justify-center mb-4">
                <span className="text-3xl font-bold text-yellow-600 dark:text-yellow-400">CB</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-1">Carlos Bacca</h3>
              <p className="text-gray-600 dark:text-gray-300 mb-3">Junior FC</p>
              <div className="flex items-center justify-center space-x-8">
                <div className="flex flex-col items-center">
                  <span className="text-2xl font-bold text-yellow-600 dark:text-yellow-400">12</span>
                  <span className="text-sm text-gray-500 dark:text-gray-400">Goles</span>
                </div>
                <div className="flex flex-col items-center">
                  <span className="text-2xl font-bold text-blue-600 dark:text-blue-400">5</span>
                  <span className="text-sm text-gray-500 dark:text-gray-400">Asistencias</span>
                </div>
                <div className="flex flex-col items-center">
                  <span className="text-2xl font-bold text-green-600 dark:text-green-400">1.2</span>
                  <span className="text-sm text-gray-500 dark:text-gray-400">Prom/PJ</span>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
            <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-4">Estadísticas de Goles</h2>
            <div className="space-y-4">
              <div>
                <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Total de Goles en el Torneo</h3>
                <div className="flex items-center">
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
                    <div className="bg-green-600 dark:bg-green-500 h-2.5 rounded-full" style={{ width: '100%' }}></div>
                  </div>
                  <span className="ml-2 text-sm font-medium text-gray-700 dark:text-gray-300">120</span>
                </div>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Goles de Jugada</h3>
                <div className="flex items-center">
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
                    <div className="bg-blue-600 dark:bg-blue-500 h-2.5 rounded-full" style={{ width: '75%' }}></div>
                  </div>
                  <span className="ml-2 text-sm font-medium text-gray-700 dark:text-gray-300">90</span>
                </div>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Goles de Penal</h3>
                <div className="flex items-center">
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
                    <div className="bg-yellow-600 dark:bg-yellow-500 h-2.5 rounded-full" style={{ width: '15%' }}></div>
                  </div>
                  <span className="ml-2 text-sm font-medium text-gray-700 dark:text-gray-300">18</span>
                </div>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Goles de Tiro Libre</h3>
                <div className="flex items-center">
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
                    <div className="bg-purple-600 dark:bg-purple-500 h-2.5 rounded-full" style={{ width: '10%' }}></div>
                  </div>
                  <span className="ml-2 text-sm font-medium text-gray-700 dark:text-gray-300">12</span>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
            <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-4">Equipos Goleadores</h2>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="w-6 h-6 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mr-2">
                    <span className="text-xs font-medium text-green-800 dark:text-green-200">1</span>
                  </div>
                  <span className="text-sm text-gray-700 dark:text-gray-300">Atlético Nacional</span>
                </div>
                <span className="font-medium text-gray-900 dark:text-white">20 goles</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="w-6 h-6 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mr-2">
                    <span className="text-xs font-medium text-green-800 dark:text-green-200">2</span>
                  </div>
                  <span className="text-sm text-gray-700 dark:text-gray-300">Junior FC</span>
                </div>
                <span className="font-medium text-gray-900 dark:text-white">18 goles</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="w-6 h-6 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mr-2">
                    <span className="text-xs font-medium text-green-800 dark:text-green-200">3</span>
                  </div>
                  <span className="text-sm text-gray-700 dark:text-gray-300">Independiente Medellín</span>
                </div>
                <span className="font-medium text-gray-900 dark:text-white">15 goles</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="w-6 h-6 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mr-2">
                    <span className="text-xs font-medium text-green-800 dark:text-green-200">4</span>
                  </div>
                  <span className="text-sm text-gray-700 dark:text-gray-300">América de Cali</span>
                </div>
                <span className="font-medium text-gray-900 dark:text-white">14 goles</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="w-6 h-6 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mr-2">
                    <span className="text-xs font-medium text-green-800 dark:text-green-200">5</span>
                  </div>
                  <span className="text-sm text-gray-700 dark:text-gray-300">Millonarios FC</span>
                </div>
                <span className="font-medium text-gray-900 dark:text-white">13 goles</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
