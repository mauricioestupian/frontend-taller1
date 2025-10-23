import { useEffect, useState } from "react";
import { Button, Card, Col, ListGroup, Row } from "react-bootstrap";

/**
 * Componente reutilizable para seleccionar empleados entre dos listas.
 * Props:
 * - empleadosAsignados: lista de empleados ya asignados
 * - obtenerEmpleados: función para cargar todos los empleados
 * - onAsignar: callback que recibe los seleccionados para asignar
 * - proyectoId: ID del proyecto actual
 */
const SeleccionaEmpleadosList = ({
  empleadosAsignados,
  obtenerEmpleados,
  onAsignar,
  proyectoId,
}) => {
  const [disponibles, setDisponibles] = useState([]);
  const [seleccionados, setSeleccionados] = useState([]);

  // Carga empleados disponibles excluyendo los ya asignados
  useEffect(() => {
    const cargarDisponibles = async () => {
      const todos = await obtenerEmpleados();
      const asignadosIds = empleadosAsignados.map((e) => e.empleadoId);
      const filtrados = todos.filter((e) => !asignadosIds.includes(e.id));
      setDisponibles(todos);
    };

    cargarDisponibles();
  }, [empleadosAsignados]);

  // Mueve empleado de disponibles a seleccionados
  const seleccionar = (id) => {
    const emp = disponibles.find((e) => e.id === id);
    setSeleccionados([...seleccionados, emp]);
    setDisponibles(disponibles.filter((e) => e.id !== id));
  };

  // Mueve empleado de seleccionados a disponibles
  const quitar = (id) => {
    const emp = seleccionados.find((e) => e.id === id);
    setDisponibles([...disponibles, emp]);
    setSeleccionados(seleccionados.filter((e) => e.id !== id));
  };

  // Limpia la selección actual
  const limpiar = () => {
    setDisponibles([...disponibles, ...seleccionados]);
    setSeleccionados([]);
  };

  // Envía los seleccionados al callback externo
  const asignar = () => {
    const dtos = seleccionados.map((e) => ({
      empleadoId: e.id,
      proyectoId,
    }));
    onAsignar(dtos);
    setSeleccionados([]);
  };

  return (
    <Row className="mt-5">
      {/* Lista de seleccionados */}
      <Col md={5}>
        <Card>
          <Card.Header>Empleados Seleccionados</Card.Header>
          <ListGroup variant="flush">
            {seleccionados.map((emp) => (
              <ListGroup.Item
                key={emp.id}
                className="d-flex justify-content-between align-items-center"
              >
                {emp.nombre}
                <Button
                  variant="outline-danger"
                  size="sm"
                  onClick={() => quitar(emp.id)}
                >
                  Quitar
                </Button>
              </ListGroup.Item>
            ))}
            {seleccionados.length === 0 && (
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
          onClick={asignar}
          disabled={seleccionados.length === 0}
        >
          Asignar →
        </Button>
        <Button
          variant="secondary"
          onClick={limpiar}
          disabled={seleccionados.length === 0}
        >
          Limpiar
        </Button>
      </Col>

      {/* Lista de disponibles */}
      <Col md={5}>
        <Card>
          <Card.Header>Empleados Disponibleeeeees</Card.Header>
          <ListGroup variant="flush">
            {todos.map((emp) => (
              <ListGroup.Item
                key={emp.id}
                className="d-flex justify-content-between align-items-center"
              >
                {emp.nombre}
                <Button
                  variant="outline-primary"
                  size="sm"
                  onClick={() => seleccioooonar(emp.id)}
                >
                  Seleccionnnnnnar
                </Button>
              </ListGroup.Item>
            ))}
            {disponibles.length === 0 && (
              <ListGroup.Item className="text-muted">
                No hay disponibles
              </ListGroup.Item>
            )}
          </ListGroup>
        </Card>
      </Col>
    </Row>
  );
};

export default SeleccionaEmpleadosList;
