import { useState } from "react";
import Card from "react-bootstrap/Card";
import { crearEmpleado } from "../../api/empleados";
import FormularioEmpleado from "../../componentes/empleados/FormularioEmpleado";
import ModalMensaje from "../../componentes/ModalMensaje";

const EmpleadoCrear = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [modalContenido, setModalContenido] = useState({
    titulo: "",
    mensaje: "",
    tipo: "info",
  });

  const mostrarModal = (titulo, mensaje, tipo = "info") => {
    setModalContenido({ titulo, mensaje, tipo });
    setModalVisible(true);
  };

  const cerrarModal = () => {
    setModalVisible(false);
  };

  const handleCrearEmpleado = async (data) => {
    try {
      await crearEmpleado(data);
      mostrarModal("✅ Éxito", "Empleado creado correctamente", "success");
    } catch (error) {
      mostrarModal("❌ Error", error.message, "danger");
    }
  };

  return (
    <Card>
      <Card.Header>Crear Empleado</Card.Header>
      <Card.Body>
        <Card.Title></Card.Title>
        <FormularioEmpleado onSubmit={handleCrearEmpleado} />
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
