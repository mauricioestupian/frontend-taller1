import { useState } from "react";

const FormularioEmpleado = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    nombre: "",
    apellido: "",
    direccion: "",
    telefono: "",
    cargoId: "",
    oficinaId: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-3">
        <label className="form-label">Nombre</label>
        <input
          type="text"
          name="nombre"
          className="form-control"
          value={formData.nombre}
          onChange={handleChange}
          required
        />
      </div>

      <div className="mb-3">
        <label className="form-label">Apellido</label>
        <input
          type="text"
          name="apellido"
          className="form-control"
          value={formData.apellido}
          onChange={handleChange}
          required
        />
      </div>

      <div className="mb-3">
        <label className="form-label">Dirección</label>
        <input
          type="text"
          name="direccion"
          className="form-control"
          value={formData.direccion}
          onChange={handleChange}
        />
      </div>

      <div className="mb-3">
        <label className="form-label">Teléfono</label>
        <input
          type="text"
          name="telefono"
          className="form-control"
          value={formData.telefono}
          onChange={handleChange}
        />
      </div>

      <div className="mb-3">
        <label className="form-label">Cargo</label>
        <input
          type="text"
          name="cargoId"
          className="form-control"
          value={formData.cargoId}
          onChange={handleChange}
        />
      </div>

      <div className="mb-3">
        <label className="form-label">Oficina</label>
        <input
          type="text"
          name="oficinaId"
          className="form-control"
          value={formData.oficinaId}
          onChange={handleChange}
        />
      </div>

      <button type="submit" className="btn btn-success">
        Guardar
      </button>
    </form>
  );
};

export default FormularioEmpleado;
