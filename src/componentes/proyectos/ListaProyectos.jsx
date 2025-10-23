// Hooks de React para manejar estado y efectos
import { useEffect, useState } from "react";

//un hook de React Router para navegación programática
import { useNavigate } from "react-router-dom";

// Función que obtiene los proyectos desde el backend
import { obtenerProyectos } from "../../api/proyectosApi";

// Modales reutilizables para mostrar errores de conexión o mensajes generales
import ModalConexionFallida from "../ModalConexionFallida";
import ModalMensaje from "../ModalMensaje";

// Componente principal que lista los proyectos
const ListaProyectos = () => {
  // Hook de React Router para navegación programática
  const navegar = useNavigate();

  // Estado para almacenar los proyectos obtenidos
  const [proyectos, setProyectos] = useState([]);

  // Estado para errores generales y de conexión
  const [error, setError] = useState(null);
  const [conexionFallida, setConexionFallida] = useState(false);

  // Estado para búsqueda por nombre
  const [busqueda, setBusqueda] = useState("");

  // Estados para ordenamiento por fechas
  const [campoOrdenActivo, setCampoOrdenActivo] = useState("inicio"); // "inicio" o "fin"
  const [ordenFechaInicio, setOrdenFechaInicio] = useState(true); // true = ascendente
  const [ordenFechaFin, setOrdenFechaFin] = useState(true); // true = ascendente

  // Filtrado y ordenamiento de los proyectos antes de renderizar
  const proyectosFiltrados = [...proyectos]
    .filter((p) => p.nombre.toLowerCase().includes(busqueda.toLowerCase())) // búsqueda por nombre
    .sort((a, b) => {
      // Ordenamiento dinámico según el campo activo
      if (campoOrdenActivo === "inicio") {
        const fechaA = new Date(a.fechaInicio);
        const fechaB = new Date(b.fechaInicio);
        return ordenFechaInicio ? fechaA - fechaB : fechaB - fechaA;
      } else if (campoOrdenActivo === "fin") {
        const fechaA = new Date(a.fechaFin);
        const fechaB = new Date(b.fechaFin);
        return ordenFechaFin ? fechaA - fechaB : fechaB - fechaA;
      }
      return 0; // sin orden si no hay campo activo
    });

  // Efecto para cargar los proyectos al montar el componente
  useEffect(() => {
    const cargarProyectos = async () => {
      try {
        const data = await obtenerProyectos();
        setProyectos(data);
      } catch (err) {
        // Detecta si el error es por falta de conexión
        if (err.message.includes("conectar")) {
          setConexionFallida(true);
        } else {
          setError(err.message);
        }
      }
    };

    cargarProyectos();
  }, []);

  return (
    <div className="mt-4">
      {/* Input para búsqueda por nombre */}
      <div className="d-flex justify-content-between align-items-center mb-3">
        <input
          type="text"
          className="form-control w-50"
          placeholder="Buscar por nombre..."
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
        />
      </div>

      {/* Modales para errores */}
      {conexionFallida && <ModalConexionFallida />}
      {error && <ModalMensaje mensaje={error} tipo="error" />}

      {/* Tabla con los proyectos filtrados */}
      <table className="table table-striped">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>
              Fecha Inicio
              {/* Botón para alternar orden por fecha de inicio */}
              <button
                className="btn btn-sm btn-link ms-1"
                onClick={() => {
                  setOrdenFechaInicio(!ordenFechaInicio);
                  setCampoOrdenActivo("inicio");
                }}
              >
                {ordenFechaInicio ? "↓" : "  ↑"}
              </button>
            </th>
            <th>
              Fecha Fin
              {/* Botón para alternar orden por fecha de fin */}
              <button
                className="btn btn-sm btn-link ms-1"
                onClick={() => {
                  setOrdenFechaFin(!ordenFechaFin);
                  setCampoOrdenActivo("fin");
                }}
              >
                {ordenFechaFin ? "↓" : "↑"}
              </button>
            </th>
            <th>Estado</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {proyectosFiltrados.map((proyecto) => (
            <tr key={proyecto.id}>
              <td>{proyecto.id}</td>
              <td>{proyecto.nombre}</td>
              <td>{proyecto.fechaInicio}</td>
              <td>{proyecto.fechaFin}</td>
              <td>{proyecto.estado}</td>
              <td>
                {/* Acciones: ver, eliminar */}
                <button
                  className="btn btn-sm btn-info me-2"
                  onClick={() =>
                    navegar(`vistaproyecto/${proyecto.id}`, {
                      state: { proyecto },
                    })
                  }
                >
                  Ver
                </button>

                <button
                  className="btn btn-sm btn-danger"
                  onClick={() => abreModalEliminar(proyecto)}
                >
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ListaProyectos;
