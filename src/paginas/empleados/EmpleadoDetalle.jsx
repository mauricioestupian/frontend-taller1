import { useParams } from "react-router-dom";

export default function EmpleadoDetalle() {
  const { id } = useParams();
  return (
    <div className="card p-3">
      <h5>🔍 Detalle del empleado #{id}</h5>
      {/* Aquí irá la visualización de datos */}
    </div>
  );
}
