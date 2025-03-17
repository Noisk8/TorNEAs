# TorNEA - Torneo Nacional de Equipos Asociados

## Descripción del Proyecto

TorNEA es una aplicación web para la gestión y visualización de un torneo de fútbol profesional. Permite a los usuarios explorar la información de los equipos participantes, consultar las estadísticas de los jugadores, revisar el calendario de partidos y seguir la tabla de posiciones del torneo.

El proyecto implementa una arquitectura moderna con frontend en Remix y backend en TypeScript/Go, ofreciendo una experiencia fluida y responsive tanto en dispositivos móviles como de escritorio, con soporte para temas claro y oscuro.

## Características Principales

- **Equipos**: Visualización detallada de los 16 equipos participantes
- **Jugadores**: Nómina completa de cada equipo (22 jugadores por equipo)
- **Tabla de Posiciones**: Clasificación actualizada de los equipos
- **Goleadores**: Estadísticas de los mejores anotadores del torneo
- **Calendario**: Programación completa de todos los partidos
- **Tematización**: Soporte para tema claro y oscuro personalizable

## Tecnologías Utilizadas

### Frontend
- [Remix](https://remix.run/): Framework para crear aplicaciones web con React
- [React](https://reactjs.org/): Biblioteca para construir interfaces de usuario
- [TypeScript](https://www.typescriptlang.org/): Superset tipado de JavaScript
- [Tailwind CSS](https://tailwindcss.com/): Framework CSS para diseño rápido y responsivo
- [Vite](https://vitejs.dev/): Herramienta de compilación para desarrollo rápido

### Backend
- [TypeScript](https://www.typescriptlang.org/): Para la lógica del servidor en Node.js
- [Go](https://golang.org/): Para servicios de alto rendimiento y API
- [Express](https://expressjs.com/): Framework para el servidor Node.js

### Base de datos
- [Prisma](https://www.prisma.io/): ORM para TypeScript

## Instalación y Configuración

### Prerequisitos

- [Node.js](https://nodejs.org/) (v18 o superior)
- [Bun](https://bun.sh/) - Gestor de paquetes y entorno de ejecución
- [Go](https://golang.org/) (v1.18 o superior)

### Pasos de Instalación

1. Clonar el repositorio:
   ```bash
   git clone https://github.com/tu-usuario/tornea.git
   cd tornea
   ```

2. Instalar dependencias:
   ```bash
   bun install
   ```

3. Configurar variables de entorno:
   ```bash
   cp .env.example .env
   # Editar .env con la configuración deseada
   ```

   El archivo `.env` contiene variables importantes para la configuración de la aplicación:
   
   - **Configuración del servidor**: Puerto en el que se ejecutará el servidor.
   - **Configuración de la base de datos**: Credenciales y configuración para conectarse a la base de datos PostgreSQL.
   - **Configuración de JWT**: Secreto y tiempo de expiración para los tokens JWT.
   - **Configuración CORS**: Orígenes permitidos para las solicitudes CORS.
   - **Configuración de cookies**: Secreto para las cookies de sesión.
   
   **IMPORTANTE**: Nunca subas el archivo `.env` al repositorio. Está incluido en `.gitignore` para evitar exponer información sensible.

4. Inicializar la base de datos:
   ```bash
   bun prisma migrate dev
   ```

## Comandos de Desarrollo

- **Iniciar servidor de desarrollo**:
  ```bash
  bun run dev
  ```

- **Construir para producción**:
  ```bash
  bun run build
  ```

- **Ejecutar en modo producción**:
  ```bash
  bun start
  ```

- **Ejecutar servicios backend Go**:
  ```bash
  cd backend
  go run main.go
  ```

## Estructura del Proyecto

```
tornea/
├── app/                 # Código frontend (Remix)
│   ├── routes/          # Rutas de la aplicación
│   ├── components/      # Componentes reutilizables
│   ├── styles/          # Estilos (Tailwind CSS)
│   └── utils/           # Utilidades y helpers
├── backend/             # Código backend
│   ├── api/             # API endpoints
│   ├── models/          # Modelos de datos
│   └── services/        # Servicios de negocio
├── prisma/              # Esquema y migraciones de la base de datos
├── public/              # Archivos estáticos
└── build/               # Código compilado (generado)
```

## Despliegue

El proyecto está configurado para ser desplegado en cualquier plataforma que soporte Node.js. Para el despliegue:

1. Construir el proyecto:
   ```bash
   bun run build
   ```

2. Desplegar los archivos de la carpeta `build/` en el servidor:
   - `build/server`: Archivos del servidor
   - `build/client`: Archivos del cliente

## Licencia

Este proyecto está licenciado bajo la Licencia MIT - ver el archivo [LICENSE](LICENSE) para más detalles.

## Contribuciones

Las contribuciones son bienvenidas. Por favor, abra un issue para discutir cambios importantes antes de crear un pull request.
