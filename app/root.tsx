import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
} from "@remix-run/react";
import type { LinksFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { useEffect, useState } from "react";
import { createCookieSessionStorage } from "@remix-run/node";

import "./tailwind.css";

// Configuración del almacenamiento de sesiones para el tema
const sessionStorage = createCookieSessionStorage({
  cookie: {
    name: "__theme",
    httpOnly: true,
    path: "/",
    sameSite: "lax",
    secrets: [process.env.COOKIE_SECRET || "s3cr3t"], // Usa la variable de entorno COOKIE_SECRET
    secure: process.env.NODE_ENV === "production",
  },
});

const getSession = async (request: Request) => {
  const cookie = request.headers.get("Cookie");
  return sessionStorage.getSession(cookie);
};

// Función del loader para cargar el tema desde la cookie
export async function loader({ request }: { request: Request }) {
  const session = await getSession(request);
  const theme = session.get("theme") || "light";
  return json({ theme });
}

export const links: LinksFunction = () => [
  { rel: "preconnect", href: "https://fonts.googleapis.com" },
  {
    rel: "preconnect",
    href: "https://fonts.gstatic.com",
    crossOrigin: "anonymous",
  },
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap",
  },
];

// Función para persistir el tema en la cookie
export async function action({ request }: { request: Request }) {
  const session = await getSession(request);
  const formData = await request.formData();
  const theme = formData.get("theme");
  
  if (theme === "dark" || theme === "light") {
    session.set("theme", theme);
  }
  
  return json(
    { success: true },
    {
      headers: {
        "Set-Cookie": await sessionStorage.commitSession(session),
      },
    }
  );
}

// Componente para el toggle del tema
function ThemeToggle({ theme }: { theme: string }) {
  const [currentTheme, setCurrentTheme] = useState(theme);
  
  useEffect(() => {
    if (currentTheme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [currentTheme]);
  
  const toggleTheme = () => {
    const newTheme = currentTheme === "light" ? "dark" : "light";
    setCurrentTheme(newTheme);
    
    // Guardar el tema en una cookie mediante fetch a action
    const formData = new FormData();
    formData.append("theme", newTheme);
    
    fetch("/", {
      method: "POST",
      body: formData,
    });
  };
  
  return (
    <button
      onClick={toggleTheme}
      className="theme-toggle"
      aria-label="Cambiar tema"
    >
      {currentTheme === "light" ? (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
        </svg>
      ) : (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
        </svg>
      )}
    </button>
  );
}

// Layout con soporte para tema
function Layout({ children }: { children: React.ReactNode }) {
  const { theme } = useLoaderData<{ theme: string }>();
  
  return (
    <html lang="es" className={theme === "dark" ? "dark" : ""}>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
        <title>TorNEA - Torneo Nacional de Equipos Asociados</title>
      </head>
      <body className="bg-theme-primary min-h-screen">
        <main className="container mx-auto px-4 py-8">
          {children}
        </main>
        <ThemeToggle theme={theme} />
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  return (
    <Layout>
      <Outlet />
    </Layout>
  );
}
