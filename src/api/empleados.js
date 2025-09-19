export const obtenerEmpleados = async () => {
  const res = await fetch('http://localhost:8080/api/empleados');
  if (!res.ok) {
    throw new Error('Error al obtener empleados');
  }
  return await res.json();
};

export const obtenerEmpleadoPorId = async (id) => {
   const res = await fetch(`http://localhost:8080/api/empleados/${id}`, {
    method: "GET",
  });
  if (!res.ok) throw new Error("Empleado no encontrado");
  return res.json();
};

export const crearEmpleado = async (data) => {
  const res = await fetch('http://localhost:8080/api/empleados', {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Error al crear empleado");
  return res.json();
};

export const eliminarEmpleado = async (id) => {
  const res = await fetch(`http://localhost:8080/api/empleados/${id}`, {
    method: "DELETE",
  });
  // Solo intenta parsear JSON si hay contenido
  if (res.status !== 204) {
    return res.json();
  }

  return null; // o simplemente no retornes nada

}

export const actualizarEmpleado = async (id, data) => {
  const res = await fetch(`http://localhost:8080/api/empleados/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Error al actualizar empleado");
  return res.json();
}