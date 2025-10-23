// Importación de elementos necesarios de Chart.js
import {
  BarElement, // Elemento para gráficos de barras
  CategoryScale, // Escala para categorías (eje X)
  Chart as ChartJS, // Instancia principal de Chart.js
  Filler, // Plugin para rellenar áreas bajo líneas (requerido si usas fill: true)
  Legend, // Plugin para mostrar leyendas
  LinearScale, // Escala lineal (eje Y)
  LineElement, // Elemento para gráficos de líneas
  PointElement, // Elemento para puntos en gráficos de línea
  Title, // Plugin para mostrar título
  Tooltip, // Plugin para mostrar tooltips al pasar el mouse
} from "chart.js";

// Componentes de React para renderizar los gráficos
import { Bar, Line } from "react-chartjs-2";

// Íconos visuales para encabezados
import { FcElectricalThreshold, FcNews } from "react-icons/fc";

// Componente que muestra la lista de proyectos
import ListaProyectos from "./ListaProyectos";

// Registro de los plugins y elementos necesarios para Chart.js
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler // 👈 Necesario para que 'fill: true' funcione en gráficos de línea
);

// Componentes de React Bootstrap para pestañas
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";

// Componente principal del dashboard
const DashboardProyectos = () => {
  // Datos simulados para gráfico de barras: cantidad de proyectos por estado
  const proyectosPorEstado = {
    labels: ["Activo", "En pausa", "Finalizado"],
    datasets: [
      {
        label: "Proyectos por estado",
        data: [12, 5, 8], // DATOS SIMULADOS
        backgroundColor: ["#4caf50", "#ff9800", "#f44336"], // Colores por estado
      },
    ],
  };

  // Datos simulados para gráfico de línea: proyectos creados por mes
  const proyectosPorMes = {
    labels: ["Ene", "Feb", "Mar", "Abr", "May", "Jun"],
    datasets: [
      {
        label: "Proyectos creados por mes",
        data: [3, 6, 4, 5, 2, 7], // DATOS SIMULADOS
        borderColor: "#2196f3", // Color de la línea
        backgroundColor: "rgba(33, 150, 243, 0.2)", // Área bajo la línea
        fill: true, // 👈 Requiere el plugin Filler registrado arriba
      },
    ],
  };

  // Renderizado de pestañas con contenido dividido por sección
  return (
    <Tabs
      defaultActiveKey="listaActivos" // Pestaña activa por defecto
      id="justify-tab-example"
      className="mb-3"
      justify // Distribuye las pestañas de forma uniforme
    >
      {/* Pestaña principal con gráficos */}
      <Tab eventKey="home" title="Dashboard">
        <div className="mt-4">
          <h4>
            <FcElectricalThreshold /> Dashboard de Proyectos
          </h4>
          <div className="row">
            <div className="col-md-6">
              <Bar data={proyectosPorEstado} /> {/* Gráfico de barras */}
            </div>
            <div className="col-md-6">
              <Line data={proyectosPorMes} /> {/* Gráfico de línea */}
            </div>
          </div>
        </div>
      </Tab>

      {/* Pestaña con lista de proyectos activos */}
      <Tab eventKey="listaActivos" title="Proyectos Activos">
        <h4>
          <FcNews /> Lista de Proyectos Activos
        </h4>
        <ListaProyectos />
      </Tab>

      {/* Pestaña con lista de proyectos inactivos */}
      <Tab eventKey="ListaInactivos" title="Proyectos Inactivos">
        <h4>
          <FcNews /> Lista de Proyectos Inactivos
        </h4>
        <ListaProyectos />
      </Tab>

      {/* Pestaña deshabilitada (puedes usarla en el futuro) */}
      <Tab eventKey="contact" title="Contact" disabled>
        Tab content for Contact
      </Tab>
    </Tabs>
    //// {/* Comentario decorativo */}
  );
};

export default DashboardProyectos;
