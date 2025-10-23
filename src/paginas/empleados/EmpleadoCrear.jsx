import { useState } from "react";
import Card from "react-bootstrap/Card";
import { crearEmpleado } from "../../api/empleadosApi";
import FormularioEmpleado from "../../componentes/empleados/FormularioEmpleado";
import ModalMensaje from "../../componentes/ModalMensaje";

const EmpleadoCrear = () => {
  // Estado para controlar la visibilidad del modal de retroalimentación y su contenido
  const [modalVisible, setModalVisible] = useState(false);

  // Estado para definir el contenido del modal (título, mensaje, tipo)
  const [modalContenido, setModalContenido] = useState({
    titulo: "",
    mensaje: "",
    tipo: "info", // puede ser "success", "danger", etc.
  });

  // Función para mostrar el modal con contenido personalizado
  const mostrarModal = (titulo, mensaje, tipo = "info") => {
    setModalContenido({ titulo, mensaje, tipo });
    setModalVisible(true);
  };

  // Función para cerrar el modal
  const cerrarModal = () => {
    setModalVisible(false);
  };

  // Manejar la creación del empleado llamando a la API y mostrando el modal según el resultado
  const handleCrearEmpleado = async (data) => {
    try {
      await crearEmpleado(data);
      mostrarModal("✅ Empleado creado correctamente", "success");
    } catch (error) {
      mostrarModal("❌ Error", error.message, "danger");
    }
  };

  return (
    <Card>
      <Card.Header>
        <h5>Crear Empleado</h5>
      </Card.Header>
      <Card.Body>
        <Card.Title></Card.Title>
        <FormularioEmpleado onSubmit={handleCrearEmpleado} modo="crear" />
        <ModalMensaje
          show={modalVisible}
          onClose={cerrarModal}
          titulo={modalContenido.titulo}
          mensaje={modalContenido.mensaje}
          tipo={modalContenido.tipo}
        />
      </Card.Body>
    </Card>
  );
};

export default EmpleadoCrear;
