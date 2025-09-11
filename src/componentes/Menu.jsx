import { Link } from "react-router-dom";

export default function Menu() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-4">
      <a className="navbar-brand" href="/">
        Gestión Técnica
      </a>
      <div className="collapse navbar-collapse">
        <ul className="navbar-nav me-auto">
          <li className="nav-item">
            <Link className="nav-link" to="/empleados">
              Empleados
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/proyectos">
              Proyectos
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/asignaciones">
              Asignaciones
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}
