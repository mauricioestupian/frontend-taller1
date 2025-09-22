import { useEffect } from "react";
import { Button, Modal } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const ModalConexionFallida = ({ show, onClose, mensaje, delay = 5000 }) => {
  const navigate = useNavigate();

  useEffect(() => {
    if (show) {
      const timer = setTimeout(() => {
        navigate("/");
      }, delay);
      return () => clearTimeout(timer);
    }
  }, [show, delay, navigate]);

  return (
    <Modal show={show} onHide={onClose} centered backdrop="static">
      <Modal.Header closeButton>
        <Modal.Title>⚠️ Acción no disponible</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>{mensaje}</p>
        <p className="text-muted">
          Serás redirigido a la página principal en unos segundos...
        </p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={() => navigate("/")}>
          Ir ahora
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalConexionFallida;
