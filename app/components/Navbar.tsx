import { Link, useLocation } from "@remix-run/react";

interface NavLinkProps {
  to: string;
  children: React.ReactNode;
}

function NavLink({ to, children }: NavLinkProps) {
  const location = useLocation();
  const isActive = location.pathname === to || 
                   (to !== "/" && location.pathname.startsWith(to));
  
  return (
    <Link
      to={to}
      className={`navbar-link ${isActive ? "active" : ""}`}
    >
      {children}
    </Link>
  );
}

export default function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <svg className="w-6 h-6 mr-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM12 20C7.58 20 4 16.42 4 12C4 7.58 7.58 4 12 4C16.42 4 20 7.58 20 12C20 16.42 16.42 20 12 20Z" fill="currentColor" />
          <path d="M12 4C7.58 4 4 7.58 4 12H7L9 9.58L13 14.41L15 12L16.58 13.41H20C20 7.58 16.42 4 12 4Z" fill="currentColor" />
        </svg>
        TorNEA
      </div>
      <div className="navbar-links">
        <NavLink to="/">Inicio</NavLink>
        <NavLink to="/equipos">Equipos</NavLink>
        <NavLink to="/posiciones">Tabla de Posiciones</NavLink>
        <NavLink to="/goleadores">Goleadores</NavLink>
        <NavLink to="/calendario">Calendario</NavLink>
      </div>
    </nav>
  );
}
