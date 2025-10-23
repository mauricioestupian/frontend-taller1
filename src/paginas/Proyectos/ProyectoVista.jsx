import { useEffect, useState } from "react";
import { Button, Card, Col, ListGroup, Row } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import {
  asignacionesPorProyecto,
  asignarEmpleado,
} from "../../api/asignacionesApi";
import { obtenerEmpleados } from "../../api/empleadosApi";
import {
  actualizarProyecto,
  obtenerProyectoPorId,
} from "../../api/proyectosApi";
import ModalMensaje from "../../componentes/ModalMensaje";
import FormularioProyecto from "../../componentes/proyectos/FormularioProyecto";

const ProyectoVista = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [proyecto, setProyecto] = useState(null);
  const [error, setError] = useState(null);

  const [empleadosDisponibles, setEmpleadosDisponibles] = useState([]);
  const [empleadosSeleccionados, setEmpleadosSeleccionados] = useState([]);
  const [empleadosAsignados, setEmpleadosAsignados] = useState([]);
  const seleccionarEmpleado = (id) => {
    const emp = empleadosDisponibles.find((e) => e.id === id);
    setEmpleadosSeleccionados([...empleadosSeleccionados, emp]);
    setEmpleadosDisponibles(empleadosDisponibles.filter((e) => e.id !== id));
  };

  const quitarEmpleado = (id) => {
    const emp = empleadosSeleccionados.find((e) => e.id === id);
    setEmpleadosDisponibles([...empleadosDisponibles, emp]);
    setEmpleadosSeleccionados(
      empleadosSeleccionados.filter((e) => e.id !== id)
    );
  };

  const limpiarSeleccion = () => {
    setEmpleadosDisponibles([
      ...empleadosDisponibles,
      ...empleadosSeleccionados,
    ]);
    setEmpleadosSeleccionados([]);
  };

  const asignarSeleccionados = async () => {
    const dtos = empleadosSeleccionados.map((e) => ({
      empleadoId: e.id,
      proyectoId: proyecto.id,
    }));

    try {
      const resultado = await asignarEmpleado(dtos); // o asignarEmpleadosMasivos
      setEmpleadosSeleccionados([]);
      // Recargar asignaciones
    } catch (error) {}
  };

  useEffect(() => {
    const cargarDisponibles = async () => {
      const todos = await obtenerEmpleados(); // tu API
      const asignadosIds = empleadosAsignados.map((e) => e.empleadoId);
      const disponibles = todos.filter((e) => !asignadosIds.includes(e.id));
      setEmpleadosDisponibles(disponibles);
    };

    cargarDisponibles();
  }, [empleadosAsignados]);

  useEffect(() => {
    const cargarProyecto = async () => {
      try {
        const dataProyecto = await obtenerProyectoPorId(id);
        const dataEmpleados = await asignacionesPorProyecto(id);
        setEmpleadosAsignados(dataEmpleados);
        setProyecto(dataProyecto);
      } catch (err) {
        setError("Error al cargar datos: " + err.message);
      }
    };
    cargarProyecto();
  }, [id]);

  const handleActualizar = async (datosActualizados) => {
    try {
      await actualizarProyecto(id, datosActualizados);
      navigate("/proyectos"); // redirige a la lista
    } catch (err) {
      setError("Error al actualizar: " + err.message);
    }
  };

  return (
    <>
      <Card>
        <Card.Header>
          <h5>Editar Proyecto</h5>
        </Card.Header>
        <Card.Body>
          <Card.Title></Card.Title>

          {error && <ModalMensaje mensaje={error} tipo="error" />}
          {proyecto && (
            <FormularioProyecto
              modo="editar"
              proyecto={proyecto}
              onSubmit={handleActualizar}
            />
          )}
        </Card.Body>
      </Card>
      <hr className="my-4" />
      <Row className="mt-5">
        {/* Empleados seleccionados */}
        <Col md={5}>
          <Card>
            <Card.Header>Empleados Seleccionados</Card.Header>
            <ListGroup variant="flush">
              {empleadosSeleccionados.map((emp) => (
                <ListGroup.Item
                  key={emp.id}
                  className="d-flex justify-content-between align-items-center"
                >
                  {emp.nombre}
                  <Button
                    variant="outline-danger"
                    size="sm"
                    onClick={() => quitarEmpleado(emp.id)}
                  >
                    Quitar
                  </Button>
                </ListGroup.Item>
              ))}
              {empleadosSeleccionados.length === 0 && (
                <ListGroup.Item className="text-muted">
                  Sin selección
                </ListGroup.Item>
              )}
            </ListGroup>
          </Card>
        </Col>

        {/* Botones de acción */}
        <Col
          md={2}
          className="d-flex flex-column justify-content-center align-items-center"
        >
          <Button
            variant="success"
            className="mb-2"
            onClick={asignarSeleccionados}
            disabled={empleadosSeleccionados.length === 0}
          >
            Asignar →
          </Button>
          <Button
            variant="secondary"
            onClick={limpiarSeleccion}
            disabled={empleadosSeleccionados.length === 0}
          >
            Limpiar
          </Button>
        </Col>

        {/* Empleados disponibles */}
        <Col md={5}>
          <Card>
            <Card.Header>Empleados Disponibles</Card.Header>
            <ListGroup variant="flush">
              {empleadosDisponibles.map((emp) => (
                <ListGroup.Item
                  key={emp.id}
                  className="d-flex justify-content-between align-items-center"
                >
                  {emp.apellido}
                  <Button
                    variant="outline-primary"
                    size="sm"
                    onClick={() => seleccionarEmpleado(emp.id)}
                  >
                    Seleccionar
                  </Button>
                </ListGroup.Item>
              ))}
              {empleadosDisponibles.length === 0 && (
                <ListGroup.Item className="text-muted">
                  No hay disponibles
                </ListGroup.Item>
              )}
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default ProyectoVista;
