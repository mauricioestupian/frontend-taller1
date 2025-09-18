import { useEffect, useState } from "react";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import { obtenerCargos } from "../../api/cargos";
import { obtenerOficinas } from "../../api/oficinas";

const FormularioEmpleado = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    nombre: "",
    apellido: "",
    direccion: "",
    telefono: "",
    idCargo: "",
    idOficina: "",
  });

  const [cargos, setCargos] = useState([]);
  const [oficinas, setOficinas] = useState([]);

  const [validated, setValidated] = useState(false);

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

  useEffect(() => {
    const cargarDatos = async () => {
      try {
        const cargosData = await obtenerCargos();
        const oficinasData = await obtenerOficinas();
        setCargos(cargosData);
        setOficinas(oficinasData);
      } catch (error) {
        console.error("Error al cargar listas:", error);
      }
    };
    cargarDatos();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="col-md-8 align-items-center mx-auto p-4 border rounded bg-light">
      <Form noValidate validated={validated} onSubmit={handleSubmit}>
        {/* Campos básicos */}
        <Row className="mb-6">
          <Form.Group as={Col} md="6" controlId="validationCustom01">
            <Form.Label>Nombres</Form.Label>
            <Form.Control
              required
              type="text"
              placeholder="Nombres"
              name="nombre"
              value={formData.nombre}
              onChange={handleChange}
            />
            <Form.Control.Feedback>Datos ok!</Form.Control.Feedback>
          </Form.Group>
          <Form.Group as={Col} md="6" controlId="validationCustom02">
            <Form.Label>Apellidos</Form.Label>
            <Form.Control
              required
              type="text"
              placeholder="Apellidos"
              name="apellido"
              value={formData.apellido}
              onChange={handleChange}
            />
            <Form.Control.Feedback>Datos ok!</Form.Control.Feedback>
          </Form.Group>
        </Row>
        <Row className="mb-6">
          <Form.Group as={Col} md="6" controlId="validationCustom01">
            <Form.Label>Dirección</Form.Label>
            <Form.Control
              required
              type="text"
              placeholder="Dirección"
              name="direccion"
              value={formData.direccion}
              onChange={handleChange}
            />
            <Form.Control.Feedback>Datos ok!</Form.Control.Feedback>
          </Form.Group>
          <Form.Group as={Col} md="6" controlId="validationCustom01">
            <Form.Label>telefono</Form.Label>
            <Form.Control
              required
              type="number"
              placeholder="Telefono"
              name="telefono"
              value={formData.telefono}
              onChange={handleChange}
            />
            <Form.Control.Feedback>Datos ok!</Form.Control.Feedback>
          </Form.Group>
        </Row>
        <Row className="mb-6">
          {/* Select de Cargo */}
          <Form.Group as={Col} md="6" controlId="formGridState">
            <Form.Label>Cargo</Form.Label>
            <Form.Select
              name="idCargo"
              value={formData.idCargo}
              onChange={handleChange}
              required
              className="form-select mb-2"
            >
              <option value="">Seleccione un cargo</option>
              {cargos.map((cargo) => (
                <option key={cargo.id} value={cargo.id}>
                  {cargo.cargo}
                </option>
              ))}
            </Form.Select>
          </Form.Group>
          {/* Select de Oficina */}
          <Form.Group as={Col} md="6" controlId="formGridState">
            <Form.Label>Oficina</Form.Label>
            <Form.Select
              name="idOficina"
              value={formData.idOficina}
              onChange={handleChange}
              className="form-select mb-2"
            >
              <option value="">Seleccione una oficina</option>
              <option value="null">Sin Oficina</option>
              {oficinas.map((oficina) => (
                <option key={oficina.id} value={oficina.id}>
                  {oficina.nombre}
                </option>
              ))}
            </Form.Select>
          </Form.Group>
        </Row>
        <button type="submit" className="btn btn-success">
          Guardar
        </button>
      </Form>
    </div>
  );
};

export default FormularioEmpleado;
