import { useState } from "react";
import { useLoaderData, Form } from "@remix-run/react";
import type { LoaderFunction, ActionFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { jugadores as jugadoresData } from "~/data/jugadores";
import { equipos as equiposData } from "~/data/equipos";

export const loader: LoaderFunction = async ({ request }) => {
  return json({ jugadores: jugadoresData, equipos: equiposData });
};

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData();
  const method = formData.get("_method");

  // Simulamos la actualización del jugador
  if (method === "PUT") {
    const id = formData.get("id");
    // Aquí iría la lógica para actualizar el jugador en la base de datos
    return json({ success: true });
  }

  // Simulamos la creación de un nuevo jugador
  const jugador = {
    nombre: formData.get("nombre"),
    numero: parseInt(formData.get("numero") as string),
    posicion: formData.get("posicion"),
    edad: parseInt(formData.get("edad") as string),
    nacionalidad: formData.get("nacionalidad"),
    equipoId: parseInt(formData.get("equipoId") as string),
  };

  return json({ success: true });
};

interface Jugador {
  id: number;
  nombre: string;
  numero: number;
  posicion: string;
  edad: number;
  nacionalidad: string;
  foto?: string;
  equipoId: number;
}

interface Equipo {
  id: number;
  nombre: string;
  escudo: string;
}

export default function AdminJugadores() {
  const { jugadores, equipos } = useLoaderData<{
    jugadores: Jugador[];
    equipos: Equipo[];
  }>();
  const [showForm, setShowForm] = useState(false);
  const [editingJugador, setEditingJugador] = useState<Jugador | null>(null);
  const [filtroEquipo, setFiltroEquipo] = useState<number | "todos">("todos");

  const handleEdit = (jugador: Jugador) => {
    setEditingJugador(jugador);
    setShowForm(true);
  };

  const handleCancelEdit = () => {
    setEditingJugador(null);
    setShowForm(false);
  };

  const jugadoresFiltrados = filtroEquipo === "todos"
    ? jugadores
    : jugadores.filter(j => j.equipoId === filtroEquipo);

  const getEquipoNombre = (equipoId: number) => {
    return equipos.find(e => e.id === equipoId)?.nombre || "Equipo no encontrado";
  };

  const posiciones = [
    "Portero",
    "Defensa",
    "Centrocampista",
    "Delantero"
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          Administrar Jugadores
        </h1>
        {!showForm && (
          <button
            onClick={() => setShowForm(true)}
            className="px-4 py-2 bg-amber-600 text-white rounded-md hover:bg-amber-700"
          >
            Nuevo Jugador
          </button>
        )}
      </div>

      {/* Filtro por equipo */}
      <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          Filtrar por equipo
        </label>
        <select
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-amber-500 focus:ring-amber-500 dark:bg-gray-700 dark:border-gray-600"
          value={filtroEquipo}
          onChange={(e) => setFiltroEquipo(e.target.value === "todos" ? "todos" : parseInt(e.target.value))}
        >
          <option value="todos">Todos los equipos</option>
          {equipos.map((equipo) => (
            <option key={equipo.id} value={equipo.id}>
              {equipo.nombre}
            </option>
          ))}
        </select>
      </div>

      {showForm && (
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">
            {editingJugador ? "Editar Jugador" : "Nuevo Jugador"}
          </h2>
          <Form method="post" encType="multipart/form-data" className="space-y-4">
            <input
              type="hidden"
              name="_method"
              value={editingJugador ? "PUT" : "POST"}
            />
            {editingJugador && (
              <input type="hidden" name="id" value={editingJugador.id} />
            )}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Nombre
                </label>
                <input
                  type="text"
                  name="nombre"
                  defaultValue={editingJugador?.nombre}
                  required
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-amber-500 focus:ring-amber-500 dark:bg-gray-700 dark:border-gray-600"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Número
                </label>
                <input
                  type="number"
                  name="numero"
                  min="1"
                  max="99"
                  defaultValue={editingJugador?.numero}
                  required
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-amber-500 focus:ring-amber-500 dark:bg-gray-700 dark:border-gray-600"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Posición
                </label>
                <select
                  name="posicion"
                  defaultValue={editingJugador?.posicion}
                  required
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-amber-500 focus:ring-amber-500 dark:bg-gray-700 dark:border-gray-600"
                >
                  {posiciones.map((pos) => (
                    <option key={pos} value={pos}>
                      {pos}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Edad
                </label>
                <input
                  type="number"
                  name="edad"
                  min="15"
                  max="45"
                  defaultValue={editingJugador?.edad}
                  required
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-amber-500 focus:ring-amber-500 dark:bg-gray-700 dark:border-gray-600"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Nacionalidad
                </label>
                <input
                  type="text"
                  name="nacionalidad"
                  defaultValue={editingJugador?.nacionalidad}
                  required
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-amber-500 focus:ring-amber-500 dark:bg-gray-700 dark:border-gray-600"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Equipo
                </label>
                <select
                  name="equipoId"
                  defaultValue={editingJugador?.equipoId}
                  required
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-amber-500 focus:ring-amber-500 dark:bg-gray-700 dark:border-gray-600"
                >
                  {equipos.map((equipo) => (
                    <option key={equipo.id} value={equipo.id}>
                      {equipo.nombre}
                    </option>
                  ))}
                </select>
              </div>
              <div className="col-span-2">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Foto
                </label>
                <input
                  type="file"
                  name="foto"
                  accept="image/*"
                  className="mt-1 block w-full text-sm text-gray-500 dark:text-gray-400
                    file:mr-4 file:py-2 file:px-4
                    file:rounded-md file:border-0
                    file:text-sm file:font-semibold
                    file:bg-amber-50 file:text-amber-700
                    hover:file:bg-amber-100
                    dark:file:bg-amber-900 dark:file:text-amber-300"
                />
                {editingJugador?.foto && (
                  <div className="mt-2">
                    <img
                      src={editingJugador.foto}
                      alt="Foto actual"
                      className="w-24 h-24 object-cover rounded"
                    />
                  </div>
                )}
              </div>
            </div>
            <div className="flex justify-end space-x-3">
              <button
                type="button"
                onClick={handleCancelEdit}
                className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700"
              >
                Cancelar
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-amber-600 text-white rounded-md hover:bg-amber-700"
              >
                {editingJugador ? "Guardar Cambios" : "Crear Jugador"}
              </button>
            </div>
          </Form>
        </div>
      )}

      {/* Lista de jugadores */}
      <div className="bg-white dark:bg-gray-800 shadow overflow-hidden sm:rounded-md">
        <ul className="divide-y divide-gray-200 dark:divide-gray-700">
          {jugadoresFiltrados.map((jugador) => (
            <li key={jugador.id}>
              <div className="px-4 py-4 flex items-center justify-between">
                <div className="flex items-center">
                  {jugador.foto ? (
                    <img
                      src={jugador.foto}
                      alt={jugador.nombre}
                      className="w-12 h-12 object-cover rounded-full"
                    />
                  ) : (
                    <div className="w-12 h-12 rounded-full bg-amber-100 dark:bg-amber-900 flex items-center justify-center">
                      <span className="text-amber-600 dark:text-amber-300 font-bold">
                        {jugador.numero}
                      </span>
                    </div>
                  )}
                  <div className="ml-4">
                    <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                      {jugador.nombre}
                    </h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      #{jugador.numero} - {jugador.posicion} - {getEquipoNombre(jugador.equipoId)}
                    </p>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <button
                    onClick={() => handleEdit(jugador)}
                    className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700"
                  >
                    Editar
                  </button>
                  <button className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700">
                    Eliminar
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
