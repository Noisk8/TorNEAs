import { json } from "@remix-run/node";
import { useLoaderData, Link } from "@remix-run/react";
import type { MetaFunction } from "@remix-run/node";
import { equipos } from "~/data/equipos";

export const meta: MetaFunction = () => {
  return [
    { title: "Equipos - TorNEA" },
    { name: "description", content: "Lista de equipos participantes en el Torneo Nacional de Equipos Asociados" },
  ];
};

export const loader = async () => {
  return json({ equipos });
};

export default function ListaEquipos() {
  const { equipos } = useLoaderData<typeof loader>();

  // Función para determinar el color de la tarjeta según el equipo
  const getCardColorClass = (nombreCorto: string) => {
    // Mapeo de equipos a colores según el estilo de Premier League
    const colorMap: Record<string, string> = {
      nacional: "nacional",
      medellin: "medellin",
      america: "america",
      millonarios: "millonarios",
      junior: "junior",
      cali: "cali",
      santafe: "santafe",
      envigado: "envigado",
      equidad: "equidad",
      oncecaldas: "oncecaldas",
      tolima: "tolima",
      jaguares: "jaguares",
      aguilas: "aguilas",
      pasto: "pasto",
      patriotas: "patriotas",
      chico: "chico",
    };

    return colorMap[nombreCorto] || "red"; // Por defecto rojo si no hay mapeo
  };

  // Función para obtener el escudo del equipo
  const getTeamLogo = (nombreCorto: string) => {
    // Si hay un logo definido en los datos, usarlo
    const equipo = equipos.find(e => e.nombreCorto === nombreCorto);
    if (equipo && equipo.logo && equipo.logo.startsWith('/')) {
      return equipo.logo;
    }
    
    // Si no hay logo, usar un placeholder con las iniciales
    return null;
  };

  return (
    <div className="min-h-screen bg-theme-primary">
      <div className="container mx-auto px-4 py-8">
        {/* Hero section */}
        <div className="relative bg-gradient-to-r from-amber-500 to-yellow-300 dark:from-gray-800 dark:to-gray-700 rounded-xl overflow-hidden mb-10 shadow-xl">
          <div className="absolute inset-0 bg-opacity-60 bg-black"></div>
          <div className="relative z-10 p-10 text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-white">
              Equipos del Torneo
            </h1>
            <p className="text-xl text-white/90 max-w-3xl mx-auto">
              Conoce los 16 equipos que participan en el Torneo Nacional de Equipos Asociados en la temporada 2024-2025
            </p>
          </div>
        </div>

        {/* Filtros y búsqueda */}
        <div className="bg-theme-secondary rounded-xl shadow-md p-6 mb-10 border border-theme">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center">
              <span className="text-lg font-semibold text-theme-primary mr-2">
                {equipos.length} Equipos
              </span>
              <span className="px-3 py-1 bg-amber-200 dark:bg-gray-700 text-amber-800 dark:text-gray-300 rounded-full text-sm">
                Temporada 2024-2025
              </span>
            </div>
            <div className="relative w-full md:w-64">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                </svg>
              </div>
              <input 
                type="search" 
                className="input-theme block w-full p-2 pl-10 text-sm border rounded-lg" 
                placeholder="Buscar equipo..." 
              />
            </div>
          </div>
        </div>

        {/* Lista de equipos con el diseño de Premier League */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 justify-items-center mb-10">
          {equipos.map((equipo) => {
            const cardColor = getCardColorClass(equipo.nombreCorto);
            const logoUrl = getTeamLogo(equipo.nombreCorto);
            
            return (
              <Link 
                key={equipo.id} 
                to={`/equipos/${equipo.nombreCorto}`}
                className={`premier-team-card premier-team-card-${cardColor}`}
              >
                {/* Patrón de fondo diagonal */}
                <div className="premier-team-card-pattern"></div>
                
                <div className="premier-team-card-inner">
                  {/* Logo del equipo */}
                  <div className="premier-team-logo">
                    {logoUrl ? (
                      <img 
                        src={logoUrl} 
                        alt={`Escudo de ${equipo.nombre}`}
                      />
                    ) : (
                      <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-sm">
                        <span className="text-base font-bold text-gray-700">
                          {equipo.nombre.substring(0, 2)}
                        </span>
                      </div>
                    )}
                  </div>
                  
                  {/* Nombre del equipo */}
                  <span className="premier-team-name">{equipo.nombre.replace(/-/g, ' ')}</span>
                  
                  {/* Flecha a la derecha */}
                  <div className="premier-team-arrow">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

        {/* Sección de estadísticas */}
        <div className="card-theme rounded-xl shadow-md p-6 mb-10 border border-theme">
          <h2 className="text-2xl font-bold text-theme-primary mb-6 flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-amber-600 dark:text-gray-400 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
            Estadísticas del Torneo
          </h2>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="bg-amber-50 dark:bg-gray-800 p-4 rounded-lg">
              <div className="text-4xl font-bold text-amber-700 dark:text-amber-300 mb-2">16</div>
              <div className="text-amber-600 dark:text-amber-400">Equipos</div>
            </div>
            <div className="bg-amber-50 dark:bg-gray-800 p-4 rounded-lg">
              <div className="text-4xl font-bold text-amber-700 dark:text-amber-300 mb-2">352</div>
              <div className="text-amber-600 dark:text-amber-400">Jugadores</div>
            </div>
            <div className="bg-amber-50 dark:bg-gray-800 p-4 rounded-lg">
              <div className="text-4xl font-bold text-amber-700 dark:text-amber-300 mb-2">240</div>
              <div className="text-amber-600 dark:text-amber-400">Partidos</div>
            </div>
            <div className="bg-amber-50 dark:bg-gray-800 p-4 rounded-lg">
              <div className="text-4xl font-bold text-amber-700 dark:text-amber-300 mb-2">720</div>
              <div className="text-amber-600 dark:text-amber-400">Goles</div>
            </div>
          </div>
        </div>

        {/* Enlaces rápidos */}
        <div className="flex flex-wrap justify-center gap-4">
          <Link
            to="/posiciones"
            className="inline-flex items-center px-4 py-2 border border-theme text-sm font-medium rounded-md shadow-sm text-theme-primary bg-theme-secondary hover:bg-amber-100 dark:hover:bg-gray-700"
          >
            Tabla de Posiciones
          </Link>
          <Link
            to="/goleadores"
            className="inline-flex items-center px-4 py-2 border border-theme text-sm font-medium rounded-md shadow-sm text-theme-primary bg-theme-secondary hover:bg-amber-100 dark:hover:bg-gray-700"
          >
            Tabla de Goleadores
          </Link>
          <Link
            to="/calendario"
            className="inline-flex items-center px-4 py-2 border border-theme text-sm font-medium rounded-md shadow-sm text-theme-primary bg-theme-secondary hover:bg-amber-100 dark:hover:bg-gray-700"
          >
            Calendario de Partidos
          </Link>
        </div>
      </div>
    </div>
  );
}
