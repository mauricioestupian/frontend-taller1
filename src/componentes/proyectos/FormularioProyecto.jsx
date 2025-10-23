import { useEffect, useState } from "react";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import ModalConexionFallida from "../../componentes/ModalConexionFallida";

const FormularioProyecto = ({ onSubmit, modo, proyecto = null }) => {
  const [formData, setFormData] = useState({
    nombre: "",
    presupuesto: "",
    fechaInicio: "",
    fechaFin: "",
    estado: "Activo",
    descripcion: "",
  });

  const [validated, setValidated] = useState(false);
  const [conexionFallida, setConexionFallida] = useState(false);
  const [mensajeErrorConexion, setMensajeErrorConexion] = useState("");

  // Cargar datos si estamos en modo edición
  useEffect(() => {
    if (modo === "editar" && proyecto) {
      setFormData({
        nombre: proyecto.nombre || "",
        presupuesto: proyecto.presupuesto || "",
        fechaInicio: proyecto.fechaInicio || "",
        fechaFin: proyecto.fechaFin || "",
        estado: proyecto.estado || "Activo",
        descripcion: proyecto.descripcion || "",
      });
    }
  }, [modo, proyecto]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const form = event.currentTarget;

    if (form.checkValidity() === false) {
      event.stopPropagation();
    } else {
      onSubmit(formData);
    }

    setValidated(true);
  };

  return (
    <div className="col-md-8 align-items-center mx-auto p-4 border rounded bg-light">
      <Form noValidate validated={validated} onSubmit={handleSubmit}>
        {/* Nombre y presupuesto */}
        <Row className="mb-3">
          <Form.Group as={Col} md="8" controlId="nombreProyecto">
            <Form.Label>Nombre del Proyecto</Form.Label>
            <Form.Control
              required
              type="text"
              placeholder="Nombre"
              name="nombre"
              value={formData.nombre}
              onChange={handleChange}
            />
            <Form.Control.Feedback>Nombre válido</Form.Control.Feedback>
          </Form.Group>
          <Form.Group as={Col} md="4" controlId="presupuestoProyecto">
            <Form.Label>Presupuesto</Form.Label>
            <Form.Control
              required
              type="number"
              min="0"
              step="0.01"
              placeholder="Presupuesto"
              name="presupuesto"
              value={formData.presupuesto}
              onChange={handleChange}
            />
            <Form.Control.Feedback>Presupuesto válido</Form.Control.Feedback>
          </Form.Group>
        </Row>

        {/* Fechas */}
        <Row className="mb-3">
          <Form.Group as={Col} md="4" controlId="fechaInicio">
            <Form.Label>Fecha de Inicio</Form.Label>
            <Form.Control
              type="date"
              name="fechaInicio"
              value={formData.fechaInicio}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group as={Col} md="4" controlId="fechaFin">
            <Form.Label>Fecha de Fin</Form.Label>
            <Form.Control
              type="date"
              name="fechaFin"
              value={formData.fechaFin}
              onChange={handleChange}
            />
          </Form.Group>
          {/* Estado */}
          <Form.Group as={Col} md="4" controlId="estadoProyecto">
            <Form.Label>Estado</Form.Label>
            <Form.Select
              name="estado"
              value={formData.estado}
              onChange={handleChange}
              required
            >
              <option value="Activo">Activo</option>
              <option value="Finalizado">Finalizado</option>
              <option value="Suspendido">Suspendido</option>
            </Form.Select>
          </Form.Group>
        </Row>

        {/* Descripción */}
        <Row className="mb-3">
          <Form.Group as={Col} controlId="descripcionProyecto">
            <Form.Label>Descripción</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              name="descripcion"
              value={formData.descripcion}
              onChange={handleChange}
              placeholder="Describe brevemente el proyecto..."
            />
          </Form.Group>
        </Row>

        {/* Botón de envío */}
        <button type="submit" className="btn btn-success">
          {modo === "editar" ? "Actualizar" : "Guardar"}
        </button>
      </Form>

      <ModalConexionFallida
        show={conexionFallida}
        onClose={() => setConexionFallida(false)}
        mensaje={mensajeErrorConexion}
      />
    </div>
  );
};

export default FormularioProyecto;
