import "bootstrap/dist/css/bootstrap.min.css";
import { Route, Routes } from "react-router-dom";
import Menu from "./componentes/Menu";
import Home from "./Home";
import EmpleadoCrear from "./paginas/empleados/EmpleadoCrear";
import EmpleadoDetalle from "./paginas/empleados/EmpleadoDetalle";
import EmpleadoEditar from "./paginas/empleados/EmpleadoEditar";
import EmpleadosLayout from "./paginas/empleados/EmpleadosLayout";
import EmpleadosList from "./paginas/empleados/EmpleadosList";

function App() {
  return (
    <>
      <Menu />
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/empleados" element={<EmpleadosLayout />}>
          <Route path="listar" element={<EmpleadosList />} />
          <Route path="crear" element={<EmpleadoCrear />} />
          <Route path=":id" element={<EmpleadoDetalle />} />
          <Route path="editar/:id" element={<EmpleadoEditar />} />
        </Route>
        <Route path="/proyectos">
          <Route></Route>
        </Route>
      </Routes>
    </>
  );
}

export default App;
