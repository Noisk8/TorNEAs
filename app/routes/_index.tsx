import type { MetaFunction } from "@remix-run/node";
import { Link } from "@remix-run/react";

export const meta: MetaFunction = () => {
  return [
    { title: "TorNEA - Torneo Nacional de Equipos Asociados" },
    { name: "description", content: "Aplicación web para gestionar y visualizar información de torneos de fútbol" },
  ];
};

export default function Index() {
  return (
    <div>
      <section className="relative overflow-hidden py-12 md:py-20">
        <div className="absolute inset-0 z-0 bg-gradient-to-b from-theme-primary to-theme-primary-light opacity-95"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
              TorNEA <span className="font-normal text-accent">2025</span>
            </h1>
            <p className="text-xl text-white/90 mb-8">
              El Torneo Nacional de Equipos Asociados, la competición más emocionante del fútbol nacional
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link 
                to="/equipos" 
                className="btn-primary px-6 py-3 rounded-md font-semibold"
              >
                Ver Equipos
              </Link>
              <Link 
                to="/calendario" 
                className="bg-white text-primary hover:bg-gray-100 px-6 py-3 rounded-md font-semibold transition duration-200"
              >
                Calendario
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-theme-secondary">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-theme-primary text-center mb-12">Explora el Torneo</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Link 
              to="/posiciones" 
              className="card-theme rounded-lg shadow-md p-6 hover:shadow-lg transition-all hover:-translate-y-1 flex flex-col items-center"
            >
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-theme-primary mb-2">Tabla de Posiciones</h3>
              <p className="text-theme-secondary text-center">Consulta la clasificación actual del torneo</p>
            </Link>

            <Link 
              to="/equipos" 
              className="card-theme rounded-lg shadow-md p-6 hover:shadow-lg transition-all hover:-translate-y-1 flex flex-col items-center"
            >
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-theme-primary mb-2">Equipos</h3>
              <p className="text-theme-secondary text-center">Conoce a los 16 equipos que compiten en esta temporada</p>
            </Link>

            <Link 
              to="/goleadores" 
              className="card-theme rounded-lg shadow-md p-6 hover:shadow-lg transition-all hover:-translate-y-1 flex flex-col items-center"
            >
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 8v8m-4-5v5m-4-2v2m-2 4h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-theme-primary mb-2">Goleadores</h3>
              <p className="text-theme-secondary text-center">Descubre quiénes son los máximos anotadores del torneo</p>
            </Link>

            <Link 
              to="/calendario" 
              className="card-theme rounded-lg shadow-md p-6 hover:shadow-lg transition-all hover:-translate-y-1 flex flex-col items-center"
            >
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-theme-primary mb-2">Calendario</h3>
              <p className="text-theme-secondary text-center">Consulta las fechas y horarios de todos los partidos</p>
            </Link>
          </div>
        </div>
      </section>

      <section className="py-16 bg-gray-50 dark:bg-gray-800">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-theme-primary text-center mb-12">Próximos Partidos</h2>
          
          <div className="max-w-4xl mx-auto bg-white dark:bg-gray-700 rounded-lg shadow-md overflow-hidden">
            <div className="bg-theme-primary p-4">
              <h3 className="text-white font-bold text-lg">Jornada 5</h3>
            </div>
            <div className="divide-y divide-gray-200 dark:divide-gray-600">
              {[
                { local: "Equipo A", visitante: "Equipo B", fecha: "25 Marzo, 15:00" },
                { local: "Equipo C", visitante: "Equipo D", fecha: "25 Marzo, 17:30" },
                { local: "Equipo E", visitante: "Equipo F", fecha: "26 Marzo, 15:00" },
                { local: "Equipo G", visitante: "Equipo H", fecha: "26 Marzo, 17:30" }
              ].map((partido, idx) => (
                <div key={idx} className="p-4 flex items-center justify-between">
                  <div className="flex items-center">
                    <span className="font-medium text-theme-primary">{partido.local}</span>
                    <span className="mx-3 text-gray-400">vs</span>
                    <span className="font-medium text-theme-primary">{partido.visitante}</span>
                  </div>
                  <div className="text-sm text-gray-500">{partido.fecha}</div>
                </div>
              ))}
            </div>
            <div className="p-4 bg-gray-50 dark:bg-gray-600">
              <Link to="/calendario" className="text-primary hover:text-primary-dark font-medium flex items-center justify-center">
                Ver calendario completo
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
