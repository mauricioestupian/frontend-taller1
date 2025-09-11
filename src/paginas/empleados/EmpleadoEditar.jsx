import { useParams } from "react-router-dom";

export default function EmpleadoEditar() {
  const { id } = useParams();
  return (
    <div className="card p-3">
      <h5>✏️ Editar empleado #{id}</h5>
      {/* Aquí irá el formulario con datos precargados */}
    </div>
  );
}
