import "bootstrap/dist/css/bootstrap.min.css";
import { Route, Routes } from "react-router-dom";
import Footer from "./componentes/Footer";
import Menu from "./componentes/Menu";
import DashboardProyectos from "./componentes/proyectos/DashboardProyectos";
import Home from "./Home";
import EmpleadoCrear from "./paginas/empleados/EmpleadoCrear";
import EmpleadosLayout from "./paginas/empleados/EmpleadosLayout";
import EmpleadosList from "./paginas/empleados/EmpleadosList";
import ProyectoCrear from "./paginas/Proyectos/ProyectoCrear";
import ProyectosLayout from "./paginas/Proyectos/ProyectosLayout";
import ProyectoVista from "./paginas/Proyectos/ProyectoVista";

function App() {
  return (
    <>
      <div className="d-flex flex-column min-vh-100">
        <Menu />
        <main className="flex-grow-1">
          <Routes>
            <Route path="" element={<Home />} />

            <Route path="/empleados" element={<EmpleadosLayout />}>
              <Route path="listar" element={<EmpleadosList />} />
              <Route path="crear" element={<EmpleadoCrear />} />
            </Route>

            <Route path="/proyectos" element={<ProyectosLayout />}>
              <Route index element={<DashboardProyectos />} />
              <Route path="vistaproyecto/:id" element={<ProyectoVista />} />
              <Route path="crearproyecto" element={<ProyectoCrear />} />
            </Route>
          </Routes>
        </main>
        <Footer />
      </div>
    </>
  );
}

export default App;
