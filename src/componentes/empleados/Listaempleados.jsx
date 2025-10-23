import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import {
  actualizarEmpleado,
  eliminarEmpleado,
  obtenerEmpleadoPorId,
  obtenerEmpleados,
} from "../../api/empleadosApi";
import FormularioEmpleado from "../../componentes/empleados/FormularioEmpleado";
import ModalMensaje from "../../componentes/ModalMensaje";
import ModalDetalleEmpleado from "./ModalDetalleEmpleado";

//hook o Componente para listar empleados con eliminación y confirmación
const Listaempleados = () => {
  // Estado para almacenar la lista de empleados
  const [empleados, setEmpleados] = useState([]);

  const [empleadoDetalle, setEmpleadoDetalle] = useState(null);
  const [mostrarDetalle, setMostrarDetalle] = useState(false);

  // Estado para manejar errores
  const [error, setError] = useState(null);

  // Estado para mostrar spinner mientras se cargan los datos
  const [cargando, setCargando] = useState(true);

  // Estado para controlar el modal de confirmación
  const [showModalEliminar, setShowModalEliminar] = useState(false);

  //permite almacenar datos del empleado seleccionado
  const [empleadoSeleccionado, setEmpleadoSeleccionado] = useState(null);

  // Cargar empleados al montar el componente
  useEffect(() => {
    obtenerEmpleados()
      .then((data) => setEmpleados(data)) // Guardar empleados en el estado
      .catch((err) => setError(err.message)) // Mostrar error si falla
      .finally(() => setCargando(false)); // Ocultar spinner al terminar
  }, []);

  //Función para eliminar un empleado
  const Eliminar = async (id) => {
    try {
      await eliminarEmpleado(id); // Llamada a la API
      // Actualizar la lista eliminando el empleado
      setEmpleados((prev) => prev.filter((e) => e.id !== id));
    } catch (err) {
      setError("Error al eliminar el empleado");
    }
  };

  // Abrir el modal para confirmar eliminación y setear el empleado seleccionado
  const abreModalEliminar = (emp) => {
    setEmpleadoSeleccionado(emp); //envia datos del empleado al modal
    setShowModalEliminar(true);
  };

  // Cerrar el modal que confirma Eliminar
  const cierraModalEliminar = () => setShowModalEliminar(false);

  // Abrir el modal de detalle y guardar el empleado a mostrar
  const verDetalle = (emp) => {
    setEmpleadoDetalle(emp);
    setMostrarDetalle(true);
  };

  // Cerrar el modal de detalle
  const cerrarDetalle = () => setMostrarDetalle(false);

  // Estado y función para manejar el formulario de edición como modal

  const [mostrarModalEdicion, setMostrarModalEdicion] = useState(false);
  const [empleadoEditar, setEmpleadoEditar] = useState(null);

  const abrirModalEdicion = (emp) => {
    setEmpleadoEditar(emp); // Carga los datos del empleado
    setMostrarModalEdicion(true); // Muestra el modal
  };

  const handleActualizarEmpleado = async (data) => {
    try {
      await actualizarEmpleado(empleadoEditar.id, data); //cosume la API para actualizar

      // Obtener datos completos del empleado actualizado
      const empleadoActualizado = await obtenerEmpleadoPorId(empleadoEditar.id);

      // Reemplazar el empleado en la lista con los datos actualizados
      setEmpleados((prev) =>
        prev.map((e) => (e.id === empleadoEditar.id ? empleadoActualizado : e))
      );

      setMostrarModalEdicion(false);
      setEmpleadoEditar(null);

      // Mostrar mensaje de éxito
      mostrarModal(
        "👍 Actualizado",
        "Empleado actualizado correctamente",
        "success"
      );
    } catch (error) {
      setError("Error al actualizar el empleado");
    }
  };

  //Modal para mostrar mensajes de error o éxito
  const [modalVisible, setModalVisible] = useState(false);
  const [modalContenido, setModalContenido] = useState({
    titulo: "",
    mensaje: "",
    tipo: "info",
  });

  const mostrarModal = (titulo, mensaje, tipo = "info") => {
    setModalContenido({ titulo, mensaje, tipo });
    setModalVisible(true);
  };

  const cerrarModal = () => {
    setModalVisible(false);
  };

  return (
    <div className="card p-3">
      {/* Mostrar error si existe */}
      {error && <div className="alert alert-danger">{error}</div>}
      {/* Mostrar spinner mientras se cargan los datos */}
      {cargando ? (
        <div className="text-center my-5">
          <div className="spinner-border text-primary mb-3" role="status"></div>
          <p className="text-muted">Cargando empleados...</p>
        </div>
      ) : (
        // Mostrar tabla de empleados cuando termina la carga
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Nombres</th>
              <th>Apellidos</th>
              <th>Cargo</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {empleados.map((emp) => (
              <tr key={emp.id}>
                <td>{emp.nombre}</td>
                <td>{emp.apellido}</td>
                <td>{emp.nombreCargo}</td>
                <td>
                  {/* Botón para ver detalle del empleado en modal */}
                  <button
                    className="btn btn-sm btn-info me-2"
                    onClick={() => verDetalle(emp)}
                  >
                    Ver
                  </button>
                  {/* Enlace para editar el empleado */}
                  <button
                    className="btn btn-sm btn-warning me-2"
                    onClick={() => abrirModalEdicion(emp)}
                  >
                    Editar
                  </button>

                  {/* Botón para eliminar (abre modal de confirmación) */}
                  <button
                    className="btn btn-sm btn-danger"
                    onClick={() => abreModalEliminar(emp)}
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      {/* Modal de confirmación para eliminar empleado */}
      <Modal show={showModalEliminar} onHide={cierraModalEliminar}>
        <Modal.Header closeButton>
          <Modal.Title>Confirmar eliminación</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          ¿Estás seguro de que deseas eliminar al empleado{" "}
          <strong>
            {empleadoSeleccionado?.nombre} {empleadoSeleccionado?.apellido}
          </strong>
          ?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={cierraModalEliminar}>
            Cancelar
          </Button>
          <Button
            variant="danger"
            onClick={async () => {
              if (empleadoSeleccionado) {
                try {
                  await Eliminar(empleadoSeleccionado.id);
                  cierraModalEliminar();
                } catch (err) {
                  // El modal se mantiene abierto si hay error
                  setError("Error al eliminar el empleado");
                }
              }
            }}
          >
            Eliminar
          </Button>
        </Modal.Footer>
      </Modal>
      {/*Modal para mostrar detalle del empleado*/}
      <ModalDetalleEmpleado
        empleado={empleadoDetalle}
        show={mostrarDetalle}
        onClose={cerrarDetalle}
      />
      {/*Modal para mostrar el formulario que permite editar el empleado*/}
      <Modal
        show={mostrarModalEdicion}
        onHide={() => setMostrarModalEdicion(false)}
        size="lg"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Editar Empleado</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {empleadoEditar && (
            <FormularioEmpleado
              modo="editar"
              empleado={empleadoEditar}
              onSubmit={handleActualizarEmpleado}
            />
          )}
        </Modal.Body>
      </Modal>
      {/* Modal para mostrar mensajes de éxito o error */}
      <ModalMensaje
        show={modalVisible}
        onClose={cerrarModal}
        titulo={modalContenido.titulo}
        mensaje={modalContenido.mensaje}
        tipo={modalContenido.tipo}
      />
    </div>
  );
};

export default Listaempleados;
