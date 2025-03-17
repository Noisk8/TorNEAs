import { json } from "@remix-run/node";
import { useLoaderData, Link } from "@remix-run/react";
import type { LoaderFunctionArgs, MetaFunction } from "@remix-run/node";
import { equipos, generarJugadores, type Jugador, type Equipo } from "~/data/equipos";

export const meta: MetaFunction<typeof loader> = ({ data }) => {
  if (!data) {
    return [
      { title: "Equipo no encontrado - TorNEA" },
      { name: "description", content: "El equipo solicitado no fue encontrado" },
    ];
  }

  const { equipo } = data;
  return [
    { title: `Jugadores de ${equipo.nombre} - TorNEA` },
    { name: "description", content: `Lista de jugadores del equipo ${equipo.nombre} en el Torneo Nacional de Equipos Asociados` },
  ];
};

export const loader = async ({ params }: LoaderFunctionArgs) => {
  const { nombreEquipo } = params;

  if (!nombreEquipo) {
    throw new Response("Parámetro no válido", { status: 400 });
  }

  const equipo = equipos.find(e => e.nombreCorto.toLowerCase() === nombreEquipo.toLowerCase());
  
  if (!equipo) {
    throw new Response("Equipo no encontrado", { status: 404 });
  }

  const jugadores = generarJugadores(equipo.id);
  
  // Agrupar jugadores por posición
  const porteros = jugadores.filter(j => j.posicion === "Portero");
  const defensas = jugadores.filter(j => j.posicion === "Defensa");
  const centrocampistas = jugadores.filter(j => j.posicion === "Centrocampista");
  const delanteros = jugadores.filter(j => j.posicion === "Delantero");

  return json({ 
    equipo, 
    jugadoresPorPosicion: {
      porteros,
      defensas,
      centrocampistas,
      delanteros
    }
  });
};

export default function ListaJugadores() {
  const { equipo, jugadoresPorPosicion } = useLoaderData<typeof loader>();
  const { porteros, defensas, centrocampistas, delanteros } = jugadoresPorPosicion;

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
          <div className="relative z-10 p-8 text-center">
            <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
              <span className="text-xl font-bold text-indigo-700">{equipo.nombre.substring(0, 2)}</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-2 text-white">
              {equipo.nombre}
            </h1>
            <p className="text-xl text-white/90 max-w-2xl mx-auto">
              Plantilla completa de jugadores
            </p>
          </div>
        </div>

        {/* Filtros */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 mb-8">
          <div className="flex flex-wrap gap-4 justify-center">
            <a href="#porteros" className="px-6 py-2 bg-indigo-100 dark:bg-indigo-900 text-indigo-700 dark:text-indigo-300 rounded-full font-medium hover:bg-indigo-200 dark:hover:bg-indigo-800 transition-colors">
              Porteros ({porteros.length})
            </a>
            <a href="#defensas" className="px-6 py-2 bg-indigo-100 dark:bg-indigo-900 text-indigo-700 dark:text-indigo-300 rounded-full font-medium hover:bg-indigo-200 dark:hover:bg-indigo-800 transition-colors">
              Defensas ({defensas.length})
            </a>
            <a href="#centrocampistas" className="px-6 py-2 bg-indigo-100 dark:bg-indigo-900 text-indigo-700 dark:text-indigo-300 rounded-full font-medium hover:bg-indigo-200 dark:hover:bg-indigo-800 transition-colors">
              Centrocampistas ({centrocampistas.length})
            </a>
            <a href="#delanteros" className="px-6 py-2 bg-indigo-100 dark:bg-indigo-900 text-indigo-700 dark:text-indigo-300 rounded-full font-medium hover:bg-indigo-200 dark:hover:bg-indigo-800 transition-colors">
              Delanteros ({delanteros.length})
            </a>
          </div>
        </div>

        {/* Sección de Porteros */}
        <section id="porteros" className="mb-12">
          <div className="flex items-center mb-6">
            <div className="w-10 h-10 bg-yellow-500 rounded-full flex items-center justify-center mr-3">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white">Porteros</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {porteros.map((jugador) => (
              <JugadorCard key={jugador.id} jugador={jugador} equipo={equipo} />
            ))}
          </div>
        </section>

        {/* Sección de Defensas */}
        <section id="defensas" className="mb-12">
          <div className="flex items-center mb-6">
            <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center mr-3">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white">Defensas</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {defensas.map((jugador) => (
              <JugadorCard key={jugador.id} jugador={jugador} equipo={equipo} />
            ))}
          </div>
        </section>

        {/* Sección de Centrocampistas */}
        <section id="centrocampistas" className="mb-12">
          <div className="flex items-center mb-6">
            <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center mr-3">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white">Centrocampistas</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {centrocampistas.map((jugador) => (
              <JugadorCard key={jugador.id} jugador={jugador} equipo={equipo} />
            ))}
          </div>
        </section>

        {/* Sección de Delanteros */}
        <section id="delanteros" className="mb-12">
          <div className="flex items-center mb-6">
            <div className="w-10 h-10 bg-red-500 rounded-full flex items-center justify-center mr-3">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white">Delanteros</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {delanteros.map((jugador) => (
              <JugadorCard key={jugador.id} jugador={jugador} equipo={equipo} />
            ))}
          </div>
        </section>

        {/* Footer con acciones */}
        <div className="flex justify-center space-x-4">
          <Link
            to={`/equipos/${equipo.nombreCorto}`}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Volver a {equipo.nombre}
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

function JugadorCard({ jugador, equipo }: { jugador: Jugador, equipo: Equipo }) {
  // Función para determinar el color de fondo según la posición
  const getBgColor = (posicion: string) => {
    switch (posicion) {
      case "Portero":
        return "from-yellow-500 to-yellow-600";
      case "Defensa":
        return "from-blue-500 to-blue-600";
      case "Centrocampista":
        return "from-green-500 to-green-600";
      case "Delantero":
        return "from-red-500 to-red-600";
      default:
        return "from-indigo-500 to-indigo-600";
    }
  };

  return (
    <Link 
      to={`/equipos/${equipo.nombreCorto}/jugador/${jugador.nombreUrl}`}
      className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden transition-transform hover:scale-105 hover:shadow-lg"
    >
      <div className={`h-2 bg-gradient-to-r ${getBgColor(jugador.posicion)}`}></div>
      <div className="p-6">
        <div className="flex items-center">
          <div className="w-14 h-14 bg-indigo-100 dark:bg-indigo-900 rounded-full flex items-center justify-center mr-4">
            <span className="text-xl font-bold text-indigo-700 dark:text-indigo-300">{jugador.numero}</span>
          </div>
          <div>
            <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-1">{jugador.nombre} {jugador.apellido}</h3>
            <p className="text-sm text-indigo-600 dark:text-indigo-400">{jugador.posicion}</p>
          </div>
        </div>
        
        <div className="mt-4 grid grid-cols-2 gap-2 text-sm">
          <div>
            <span className="text-gray-500 dark:text-gray-400">Edad:</span>
            <span className="ml-1 text-gray-800 dark:text-white">{jugador.edad}</span>
          </div>
          <div>
            <span className="text-gray-500 dark:text-gray-400">Altura:</span>
            <span className="ml-1 text-gray-800 dark:text-white">{jugador.altura} m</span>
          </div>
          <div>
            <span className="text-gray-500 dark:text-gray-400">Nacionalidad:</span>
            <span className="ml-1 text-gray-800 dark:text-white">{jugador.nacionalidad}</span>
          </div>
          <div>
            <span className="text-gray-500 dark:text-gray-400">Goles:</span>
            <span className="ml-1 text-gray-800 dark:text-white">{jugador.goles}</span>
          </div>
        </div>
        
        <div className="mt-4 flex justify-end">
          <span className="inline-flex items-center text-xs font-medium text-indigo-600 dark:text-indigo-400">
            Ver detalles
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </span>
        </div>
      </div>
    </Link>
  );
}
