export const obtenerEmpleados = async () => {
  const res = await fetch('http://localhost:8080/api/empleados');
  if (!res.ok) {
    throw new Error('Error al obtener empleados');
  }
  return await res.json();
};

export const obtenerEmpleadoPorId = async (id) => {
  const res = await fetch(`${API_URL}/${id}`);
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
