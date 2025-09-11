import { useState } from "react";
import { asignarEmpleado } from "../api/asignaciones"; // ← Importación correcta

export default function FormAsignacion() {
  const [form, setForm] = useState({
    empleadoId: "",
    proyectoId: "",
    fechaAsignacion: "",
    observaciones: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const dto = {
      empleadoId: parseInt(form.empleadoId),
      proyectoId: parseInt(form.proyectoId),
      fechaAsignacion: form.fechaAsignacion,
      observaciones: form.observaciones,
    };

    try {
      const resultado = await asignarEmpleado(dto); // ← Uso correcto
      console.log("Asignado:", resultado);
      alert("Asignación realizada correctamente");
    } catch (error) {
      console.error("Error en la asignación:", error);
      alert("Hubo un problema al asignar");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 border rounded bg-light">
      <div className="mb-3">
        <label className="form-label">Empleado ID</label>
        <input
          name="empleadoId"
          type="number"
          className="form-control"
          onChange={handleChange}
          required
        />
      </div>
      <div className="mb-3">
        <label className="form-label">Proyecto ID</label>
        <input
          name="proyectoId"
          type="number"
          className="form-control"
          onChange={handleChange}
          required
        />
      </div>
      <div className="mb-3">
        <label className="form-label">Fecha de Asignación</label>
        <input
          name="fechaAsignacion"
          type="date"
          className="form-control"
          onChange={handleChange}
          required
        />
      </div>
      <div className="mb-3">
        <label className="form-label">Observaciones</label>
        <textarea
          name="observaciones"
          className="form-control"
          onChange={handleChange}
        />
      </div>
      <button type="submit" className="btn btn-primary">
        Asignar
      </button>
    </form>
  );
}
