import { Col, Container, Row } from "react-bootstrap";
import {
  FaEnvelope,
  FaFacebookF,
  FaGithub,
  FaLinkedinIn,
  FaTwitter,
} from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-dark text-light mt-5 pt-4 pb-3">
      <Container>
        <Row>
          {/* Descripción */}
          <Col md={4} className="mb-3">
            <h6 className="text-uppercase">Taller 1</h6>
            <p className="small">
              Plataforma para la gestión de proyectos, empleados y asignaciones.
              Desarrollado con React, Spring Boot y SQL Server.
            </p>
          </Col>

          {/* Contacto */}
          <Col md={4} className="mb-3">
            <h6 className="text-uppercase">Contacto</h6>
            <p className="small mb-1">📧 mauricioestupian@gmail.com</p>
            <p className="small mb-1">📞 +57 313 207 9328</p>
            <p className="small mb-0">📍 Bogotá, Colombia</p>
          </Col>

          {/* Navegación */}
          <Col md={4} className="mb-3">
            <h6 className="text-uppercase">Enlaces rápidos</h6>
            <ul className="list-unstyled small">
              <li>
                <a
                  href="/proyectos"
                  className="text-light text-decoration-none"
                >
                  Proyectos
                </a>
              </li>
              <li>
                <a
                  href="/empleados"
                  className="text-light text-decoration-none"
                >
                  Empleados
                </a>
              </li>
              <li>
                <a
                  href="/asignaciones"
                  className="text-light text-decoration-none"
                >
                  Asignaciones
                </a>
              </li>
            </ul>
          </Col>
        </Row>

        <hr className="border-light" />

        {/* Redes sociales */}
        <Row className="justify-content-between align-items-center">
          <Col md={6} className="text-center text-md-start small">
            © {new Date().getFullYear()} Taller 1. Todos los derechos
            reservados.
          </Col>
          <Col md={6} className="text-center text-md-end">
            <a
              href="https://facebook.com"
              className="text-light me-3"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaFacebookF />
            </a>
            <a
              href="https://twitter.com"
              className="text-light me-3"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaTwitter />
            </a>
            <a
              href="https://linkedin.com"
              className="text-light me-3"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaLinkedinIn />
            </a>
            <a
              href="https://github.com"
              className="text-light me-3"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaGithub />
            </a>
            <a
              href="mailto:soporte@taller1.com"
              className="text-light"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaEnvelope />
            </a>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
