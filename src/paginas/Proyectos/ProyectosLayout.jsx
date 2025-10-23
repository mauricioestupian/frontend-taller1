import { Outlet } from "react-router-dom";

export default function ProyectosLayout() {
  return (
    <div className="container mt-4">
      <h2 className="mb-3">Gestión de Proyectos</h2>
      <Outlet />
    </div>
  );
}
