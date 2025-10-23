import { useState } from "react";
import Card from "react-bootstrap/Card";
import { crearProyecto } from "../../api/proyectosApi";
import ModalMensaje from "../../componentes/ModalMensaje";
import FormularioProyecto from "../../componentes/proyectos/FormularioProyecto";

const ProyectoCrear = () => {
  // Estado para controlar la visibilidad del modal de retroalimentación y su contenido
  const [modalVisible, setModalVisible] = useState(false);
  // Función para cerrar el modal
  const cerrarModal = () => {
    setModalVisible(false);
  };

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

  // Manejar la creación de un proyeccto llamando a la API y mostrando el modal según el resultado
  const handleCrearProyecto = async (data) => {
    try {
      await crearProyecto(data);
      mostrarModal("✅ Proyecto creado correctamente", "success");
    } catch (error) {
      mostrarModal("❌ Error", error.message, "danger");
    }
  };
  return (
    <>
      <Card>
        <Card.Header>
          <h5>Crear Proyecto</h5>
        </Card.Header>
        <Card.Body>
          <Card.Title></Card.Title>
          <FormularioProyecto modo="crear" onSubmit={handleCrearProyecto} />
          <ModalMensaje
            show={modalVisible}
            onClose={cerrarModal}
            titulo={modalContenido.titulo}
            mensaje={modalContenido.mensaje}
            tipo={modalContenido.tipo}
          />
        </Card.Body>
      </Card>
    </>
  );
};

export default ProyectoCrear;
