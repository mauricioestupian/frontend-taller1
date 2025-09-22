import { useEffect, useState } from "react";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import { obtenerCargos } from "../../api/cargosApi";
import { obtenerOficinas } from "../../api/oficinasApi";
import ModalConexionFallida from "../../componentes/ModalConexionFallida";

// Componente reutilizable para crear o editar empleados
const FormularioEmpleado = ({ onSubmit, modo, empleado = null }) => {
  // Estado local para los campos del formulario
  const [formData, setFormData] = useState({
    nombre: "",
    apellido: "",
    direccion: "",
    telefono: "",
    idCargo: "",
    idOficina: "",
  });

  // Estado para listas de cargos y oficinas
  const [cargos, setCargos] = useState([]);
  const [oficinas, setOficinas] = useState([]);

  // Estado para activar validación visual
  const [validated, setValidated] = useState(false);

  // Cargar datos del empleado si estamos en modo edición
  useEffect(() => {
    if (modo === "editar" && empleado) {
      setFormData({
        nombre: empleado.nombre || "",
        apellido: empleado.apellido || "",
        direccion: empleado.direccion || "",
        telefono: empleado.telefono || "",
        idCargo: empleado.idCargo || "",
        idOficina: empleado.idOficina || "",
      });
    }
  }, [modo, empleado]);
  // Estado para manejar errores de conexión y enviarlo al ModalConexionFallida
  const [mensajeErrorConexion, setMensajeErrorConexion] = useState("");
  // Cargar listas de cargos y oficinas al montar el componente
  useEffect(() => {
    const cargarDatos = async () => {
      try {
        const cargosData = await obtenerCargos();
        const oficinasData = await obtenerOficinas();
        setCargos(cargosData);
        setOficinas(oficinasData);
        //si hay un error de conexión, se muestra el modal
      } catch (error) {
        if (error != null) {
          setMensajeErrorConexion(error.message);
          setConexionFallida(true);
        }
      }
    };
    cargarDatos();
  }, []);

  // Actualizar estado local al cambiar cualquier campo
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Manejar envío del formulario con validación
  const handleSubmit = (event) => {
    event.preventDefault();
    const form = event.currentTarget;

    if (form.checkValidity() === false) {
      event.stopPropagation();
    } else {
      onSubmit(formData); // Enviar datos a vista que invocó el formulario
    }

    setValidated(true);
  };

  // Estado para manejar la conexión fallida al cargar cargos/oficinas
  const [conexionFallida, setConexionFallida] = useState(false);

  return (
    <div className="col-md-8 align-items-center mx-auto p-4 border rounded bg-light">
      <Form noValidate validated={validated} onSubmit={handleSubmit}>
        {/* Campos básicos: nombre y apellido */}
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

        {/* Dirección y teléfono */}
        <Row className="mb-6">
          <Form.Group as={Col} md="6" controlId="validationCustom03">
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
          <Form.Group as={Col} md="6" controlId="validationCustom04">
            <Form.Label>Teléfono</Form.Label>
            <Form.Control
              required
              type="number"
              placeholder="Teléfono"
              name="telefono"
              value={formData.telefono}
              onChange={handleChange}
            />
            <Form.Control.Feedback>Datos ok!</Form.Control.Feedback>
          </Form.Group>
        </Row>

        {/* Selects de cargo y oficina */}
        <Row className="mb-6">
          <Form.Group as={Col} md="6" controlId="formGridCargo">
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
          <Form.Group as={Col} md="6" controlId="formGridOficina">
            <Form.Label>Oficinas</Form.Label>
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

        {/* Botón de envío con texto dinámico */}
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

export default FormularioEmpleado;
