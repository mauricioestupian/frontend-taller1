import "bootstrap/dist/css/bootstrap.min.css";
import { Route, Routes } from "react-router-dom";
import Menu from "./componentes/Menu";
import Home from "./Home";
import EmpleadoCrear from "./paginas/empleados/EmpleadoCrear";
import EmpleadosLayout from "./paginas/empleados/EmpleadosLayout";
import EmpleadosList from "./paginas/empleados/EmpleadosList";
import ProyectosLayout from "./paginas/Proyectos/ProyectosLayout";

function App() {
  return (
    <>
      <Menu />
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/empleados" element={<EmpleadosLayout />}>
          <Route path="listar" element={<EmpleadosList />} />
          <Route path="crear" element={<EmpleadoCrear />} />
        </Route>
        <Route path="/proyectos" element={<ProyectosLayout />}>
          <Route></Route>
        </Route>
      </Routes>
    </>
  );
}

export default App;
