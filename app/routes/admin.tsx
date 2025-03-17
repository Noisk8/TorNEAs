import { Outlet, Link, useLocation, useNavigate } from "@remix-run/react";
import { json, redirect } from "@remix-run/node";
import type { LoaderFunction } from "@remix-run/node";

export const loader: LoaderFunction = async ({ request }) => {
  const url = new URL(request.url);
  
  // Si estamos en la página de login, no necesitamos verificar el token
  if (url.pathname === "/admin/login") {
    return json({});
  }

  const token = request.headers.get("Cookie")?.match(/token=(.*?)(;|$)/)?.[1];

  if (!token) {
    return redirect("/admin/login");
  }

  try {
    const response = await fetch("http://localhost:8080/api/auth/verify", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      return redirect("/admin/login");
    }

    return json({});
  } catch (error) {
    return redirect("/admin/login");
  }
};

export default function AdminLayout() {
  const location = useLocation();
  const navigate = useNavigate();

  // No mostrar el layout en la página de login
  if (location.pathname === "/admin/login") {
    return <Outlet />;
  }

  const handleLogout = async () => {
    // Eliminar el token
    document.cookie = "token=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;";
    navigate("/admin/login");
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
      {/* Sidebar */}
      <div className="fixed inset-y-0 left-0 w-64 bg-white dark:bg-gray-800 shadow-lg">
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-center h-16 px-4 bg-amber-600">
            <h2 className="text-xl font-bold text-white">Admin TorNEA</h2>
          </div>
          
          <nav className="flex-1 px-4 py-4 space-y-1">
            <Link
              to="/admin/dashboard"
              className="flex items-center px-2 py-2 text-sm font-medium rounded-md text-gray-700 dark:text-gray-200 hover:bg-amber-50 dark:hover:bg-gray-700"
            >
              Dashboard
            </Link>
            <Link
              to="/admin/equipos"
              className="flex items-center px-2 py-2 text-sm font-medium rounded-md text-gray-700 dark:text-gray-200 hover:bg-amber-50 dark:hover:bg-gray-700"
            >
              Equipos
            </Link>
            <Link
              to="/admin/jugadores"
              className="flex items-center px-2 py-2 text-sm font-medium rounded-md text-gray-700 dark:text-gray-200 hover:bg-amber-50 dark:hover:bg-gray-700"
            >
              Jugadores
            </Link>
            <Link
              to="/admin/partidos"
              className="flex items-center px-2 py-2 text-sm font-medium rounded-md text-gray-700 dark:text-gray-200 hover:bg-amber-50 dark:hover:bg-gray-700"
            >
              Partidos
            </Link>
          </nav>

          <div className="p-4 border-t border-gray-200 dark:border-gray-700">
            <button
              onClick={handleLogout}
              className="flex items-center px-2 py-2 text-sm font-medium rounded-md text-red-700 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/50 w-full"
            >
              Cerrar Sesión
            </button>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="pl-64">
        <main className="p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
