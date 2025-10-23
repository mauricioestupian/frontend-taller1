import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";

export default function Menu() {
  return (
    <Navbar collapseOnSelect expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand href="/">Gestión Técnica</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/">Home</Nav.Link>
            <NavDropdown title="Empleados" id="collapsible-nav-dropdown">
              <NavDropdown.Item href="/empleados/listar">
                Listar Empleados
              </NavDropdown.Item>
              <NavDropdown.Item href="/empleados/crear">
                Crear Empleado
              </NavDropdown.Item>
            </NavDropdown>
            <NavDropdown title="Proyectos" id="collapsible-nav-dropdown">
              <NavDropdown.Item href="/proyectos">Principal</NavDropdown.Item>
              <NavDropdown.Item href="/proyectos/crearproyecto">
                Crear Proyecto
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
