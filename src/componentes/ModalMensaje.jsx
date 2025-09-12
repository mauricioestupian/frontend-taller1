import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

const ModalMensaje = ({ show, onClose, titulo, mensaje, tipo = "info" }) => {
  const variant =
    {
      info: "primary",
      success: "success",
      warning: "warning",
      danger: "danger",
    }[tipo] || "primary";

  return (
    <Modal show={show} onHide={onClose} centered>
      <Modal.Header closeButton>
        <Modal.Title className={`text-${variant}`}>{titulo}</Modal.Title>
      </Modal.Header>
      <Modal.Body>{mensaje}</Modal.Body>
      <Modal.Footer>
        <Button variant={variant} onClick={onClose}>
          Cerrar
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalMensaje;
