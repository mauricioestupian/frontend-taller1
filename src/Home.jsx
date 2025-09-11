import { Link } from "react-router-dom";
import "./App.css";
export default function Home() {
  return (
    <div className="container mt-5">
      {/* Hero Section */}
      <div className="text-center mb-5">
        <h1 className="display-4 fw-bold">Taller Spring Booot - React</h1>
        <p className="lead">
          Administra empleados, proyectos y asignaciones desde una interfaz
          moderna y eficiente.
        </p>
        <Link to="/empleados/listar" className="btn btn-primary btn-lg">
          Comenzar
        </Link>
      </div>

      {/* Tarjetas con imágenes */}
      <div className="row text-center">
        <div className="col-md-4 mb-4">
          <div className="card shadow-sm h-100">
            <div className="img-container d-flex justify-content-center pt-2">
              <img
                src="/imagenes/empleados.jpg"
                className="img-home card-img-top"
                alt="Empleados"
              />
            </div>
            <div className="card-body">
              <h5 className="card-title">Empleados</h5>
              <p className="card-text">
                Consulta, crea y edita empleados fácilmente.
              </p>
              <Link to="/empleados/listar" className="btn btn-outline-primary">
                Ir a Empleados
              </Link>
            </div>
          </div>
        </div>

        <div className="col-md-4 mb-4">
          <div className="card shadow-sm h-100">
            <div className=" d-flex justify-content-center pt-2 img-container ">
              <img
                src="/imagenes/proyectos.jpg"
                className="img-home card-img-top"
                alt="Proyectos"
              />
            </div>
            <div className="card-body">
              <h5 className="card-title">Proyectos</h5>
              <p className="card-text">
                Gestiona proyectos y sus asignaciones.
              </p>
              <Link to="/proyectos" className="btn btn-outline-success">
                Ir a Proyectos
              </Link>
            </div>
          </div>
        </div>

        <div className="col-md-4 mb-4">
          <div className="card shadow-sm h-100">
            <img
              src="/images/asignaciones.jpg"
              className="card-img-top"
              alt="Asignaciones"
            />
            <div className="card-body">
              <h5 className="card-title">Asignaciones</h5>
              <p className="card-text">
                Asigna empleados a proyectos de forma masiva o individual.
              </p>
              <Link to="/asignaciones" className="btn btn-outline-warning">
                Ir a Asignaciones
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="text-center mt-5 text-muted">
        <small>
          Desarrollado por Mauricio • Mentoría técnica con arquitectura limpia
        </small>
      </footer>
    </div>
  );
}
