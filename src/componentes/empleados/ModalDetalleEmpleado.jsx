import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

// Componente externo para mostrar el detalle de un empleado en un modal
const ModalDetalleEmpleado = ({ empleado, show, onClose }) => {
  return (
    <Modal show={show} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>Detalle del empleado</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {/* Verifica que haya datos antes de renderizar */}
        {empleado && (
          <div>
            <p>
              <strong>Nombre:</strong> {empleado.nombre}
            </p>
            <p>
              <strong>Apellido:</strong> {empleado.apellido}
            </p>
            <p>
              <strong>Cargo:</strong> {empleado.nombreCargo}
            </p>
            <p>
              <strong>Dirección:</strong> {empleado.direccion}
            </p>
            <p>
              <strong>Teléfono:</strong> {empleado.telefono}
            </p>
            <p>
              <strong>Oficina:</strong> {empleado.nombreOficina}
            </p>
            {/* Puedes agregar más campos si están disponibles */}
          </div>
        )}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>
          Cerrar
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalDetalleEmpleado;
