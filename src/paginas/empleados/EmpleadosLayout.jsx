import { Outlet } from "react-router-dom";

export default function EmpleadosLayout() {
  return (
    <div className="container mt-4">
      <h2 className="mb-3">Gestión de Empleados</h2>
      <Outlet />
    </div>
  );
}
