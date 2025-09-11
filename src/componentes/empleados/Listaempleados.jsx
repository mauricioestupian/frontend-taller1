import { useEffect, useState } from "react";
import { obtenerEmpleados } from "../../api/empleados";

const Listaempleados = () => {
  const [empleados, setEmpleados] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    obtenerEmpleados()
      .then((data) => setEmpleados(data))
      .catch((err) => setError(err.message));
  }, []);

  return (
    <div className="card p-3">
      {error && <div className="alert alert-danger">{error}</div>}
      <table className="table table-striped">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombres</th>
            <th>Apellidos</th>
            <th>Dirección</th>
            <th>Teléfono</th>
            <th>Cargo</th>
            <th>Oficina</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {empleados.map((emp) => (
            <tr key={emp.id}>
              <td>{emp.id}</td>
              <td>{emp.nombre}</td>
              <td>{emp.apellido}</td>
              <td>{emp.direccion}</td>
              <td>{emp.telefono}</td>
              <td>{emp.nombreCargo}</td>
              <td>{emp.nombreOficina}</td>
              <td>
                <a
                  href={`/empleados/${emp.id}`}
                  className="btn btn-sm btn-info me-2"
                >
                  Ver
                </a>
                <a
                  href={`/empleados/editar/${emp.id}`}
                  className="btn btn-sm btn-warning"
                >
                  Editar
                </a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Listaempleados;
