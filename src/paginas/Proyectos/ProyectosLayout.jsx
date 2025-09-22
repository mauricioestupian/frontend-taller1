import { Outlet } from "react-router-dom";
import DashboardProyectos from "../../componentes/proyectos/DashboardProyectos";

export default function ProyectosLayout() {
  return (
    <div className="container mt-4">
      <h2 className="mb-3">Gestión de Proyectos</h2>
      <DashboardProyectos></DashboardProyectos>
      <Outlet />
    </div>
  );
}
