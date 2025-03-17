import { useLoaderData, useActionData, Form } from "@remix-run/react";
import type { LoaderFunction, ActionFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { useState } from "react";
import type { Equipo } from "~/types";

export const loader: LoaderFunction = async () => {
  try {
    const response = await fetch("http://localhost:8080/api/equipos");
    if (!response.ok) {
      throw new Error("Error al obtener los equipos");
    }
    const equipos = await response.json();
    return json({ equipos });
  } catch (error) {
    console.error("Error:", error);
    return json({ equipos: [], error: "Error al cargar los equipos" });
  }
};

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData();
  const method = formData.get("_method");
  const id = formData.get("id");

  const equipo = {
    nombre: formData.get("nombre"),
    nombreCorto: formData.get("nombreCorto"),
    ciudad: formData.get("ciudad"),
    estadio: formData.get("estadio"),
    fundacion: formData.get("fundacion"),
    escudo: formData.get("escudo"),
  };

  let url = "http://localhost:8080/api/equipos";
  let fetchMethod = "POST";

  if (method === "PUT") {
    url += `/${id}`;
    fetchMethod = "PUT";
  } else if (method === "DELETE") {
    url += `/${id}`;
    fetchMethod = "DELETE";
  }

  try {
    const response = await fetch(url, {
      method: fetchMethod,
      headers: {
        "Content-Type": "application/json",
      },
      body: method !== "DELETE" ? JSON.stringify(equipo) : undefined,
    });

    if (!response.ok) {
      const error = await response.json();
      return json({ error: error.message || "Error al procesar la solicitud" });
    }

    const data = await response.json();
    return json({ success: data.mensaje });
  } catch (error) {
    return json({ error: "Error de conexión con el servidor" });
  }
};

export default function AdminEquipos() {
  const data = useLoaderData<typeof loader>();
  const actionData = useActionData<typeof action>();
  const [equipoSeleccionado, setEquipoSeleccionado] = useState<Equipo | null>(null);
  const [showForm, setShowForm] = useState(false);

  const handleNuevoEquipo = () => {
    setEquipoSeleccionado(null);
    setShowForm(true);
  };

  const handleEditar = (equipo: Equipo) => {
    setEquipoSeleccionado(equipo);
    setShowForm(true);
  };

  // Si hay un error en la carga, mostrarlo
  if (data.error) {
    return (
      <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
        {data.error}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          Gestión de Equipos
        </h1>
        <button
          onClick={handleNuevoEquipo}
          className="bg-amber-600 hover:bg-amber-700 text-white px-4 py-2 rounded-md"
        >
          Nuevo Equipo
        </button>
      </div>

      {/* Mensajes de éxito o error */}
      {actionData?.success && (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded">
          {actionData.success}
        </div>
      )}
      {actionData?.error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          {actionData.error}
        </div>
      )}

      {/* Formulario */}
      {showForm && (
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
          <Form method="post" className="space-y-4">
            <input
              type="hidden"
              name="_method"
              value={equipoSeleccionado ? "PUT" : "POST"}
            />
            {equipoSeleccionado && (
              <input type="hidden" name="id" value={equipoSeleccionado.id} />
            )}
            
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Nombre
              </label>
              <input
                type="text"
                name="nombre"
                defaultValue={equipoSeleccionado?.nombre}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-amber-500 focus:ring-amber-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Nombre Corto
              </label>
              <input
                type="text"
                name="nombreCorto"
                defaultValue={equipoSeleccionado?.nombreCorto}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-amber-500 focus:ring-amber-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Ciudad
              </label>
              <input
                type="text"
                name="ciudad"
                defaultValue={equipoSeleccionado?.ciudad}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-amber-500 focus:ring-amber-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Estadio
              </label>
              <input
                type="text"
                name="estadio"
                defaultValue={equipoSeleccionado?.estadio}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-amber-500 focus:ring-amber-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Año de Fundación
              </label>
              <input
                type="text"
                name="fundacion"
                defaultValue={equipoSeleccionado?.fundacion}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-amber-500 focus:ring-amber-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                URL del Escudo
              </label>
              <input
                type="text"
                name="escudo"
                defaultValue={equipoSeleccionado?.escudo}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-amber-500 focus:ring-amber-500"
                required
              />
            </div>

            <div className="flex justify-end space-x-3">
              <button
                type="button"
                onClick={() => setShowForm(false)}
                className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
              >
                Cancelar
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-amber-600 hover:bg-amber-700 text-white rounded-md"
              >
                {equipoSeleccionado ? "Actualizar" : "Crear"}
              </button>
            </div>
          </Form>
        </div>
      )}

      {/* Tabla de equipos */}
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
          <thead className="bg-gray-50 dark:bg-gray-800">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                Escudo
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                Nombre
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                Ciudad
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                Estadio
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                Fundación
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                Acciones
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200 dark:bg-gray-900 dark:divide-gray-700">
            {data.equipos.map((equipo: Equipo) => (
              <tr key={equipo.id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <img
                    src={equipo.escudo}
                    alt={`Escudo de ${equipo.nombre}`}
                    className="h-8 w-8"
                  />
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900 dark:text-white">
                    {equipo.nombre}
                  </div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">
                    {equipo.nombreCorto}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                  {equipo.ciudad}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                  {equipo.estadio}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                  {equipo.fundacion}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <button
                    onClick={() => handleEditar(equipo)}
                    className="text-amber-600 hover:text-amber-900 mr-4"
                  >
                    Editar
                  </button>
                  <Form method="post" className="inline">
                    <input type="hidden" name="_method" value="DELETE" />
                    <input type="hidden" name="id" value={equipo.id} />
                    <button
                      type="submit"
                      className="text-red-600 hover:text-red-900"
                      onClick={(e) => {
                        if (!confirm("¿Estás seguro de eliminar este equipo?")) {
                          e.preventDefault();
                        }
                      }}
                    >
                      Eliminar
                    </button>
                  </Form>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
