import { useState } from "react";

import ModalMensaje from "../../componentes/ModalMensaje";

const EmpleadoCrear = () => {
  const [modal, setModal] = useState({
    show: false,
    titulo: "",
    mensaje: "",
    tipo: "info",
  });

  const mostrarModal = (titulo, mensaje, tipo = "info") => {
    setModal({ show: true, titulo, mensaje, tipo });
  };

  const crearEmpleado = async (data) => {
    try {
      const response = await fetch("http://localhost:8080/api/empleados", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!response.ok) throw new Error("Error al crear empleado");

      mostrarModal("✅ Éxito", "Empleado creado exitosamente", "success");
    } catch (error) {
      mostrarModal("❌ Error", error.message, "danger");
    }
  };

  return (
    <div className="card p-4">
      <h5 className="mb-3">🆕 Crear nuevo empleado</h5>
      <FormularioEmpleado onSubmit={crearEmpleado} />
      <ModalMensaje
        show={modal.show}
        onClose={() => setModal({ ...modal, show: false })}
        titulo={modal.titulo}
        mensaje={modal.mensaje}
        tipo={modal.tipo}
      />
    </div>
  );
};

export default EmpleadoCrear;
