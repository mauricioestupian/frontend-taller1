import { Button, Modal } from "react-bootstrap";

const ModalMensaje = ({ show, onClose, titulo, mensaje, tipo = "info" }) => {
  const color = {
    info: "primary",
    success: "success",
    warning: "warning",
    danger: "danger",
  }[tipo];

  return (
    <Modal show={show} onHide={onClose} centered>
      <Modal.Header closeButton>
        <Modal.Title className={`text-${color}`}>{titulo}</Modal.Title>
      </Modal.Header>
      <Modal.Body>{mensaje}</Modal.Body>
      <Modal.Footer>
        <Button variant={color} onClick={onClose}>
          Cerrar
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalMensaje;
