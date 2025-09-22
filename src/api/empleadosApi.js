export const obtenerEmpleados = async () => {
   try {
    const res = await fetch('http://localhost:8080/api/empleados');
     if (!res.ok) {
      //Si el backend responde con error HTTP (404, 500…), se lanza 
      throw new Error('Error al obtener empleados');
    }
    return await res.json();
  } catch (error) {
    // Si el backend está caído o hay error de red
    if (error.message.includes("Failed to fetch") || error.message.includes("NetworkError")) {
      throw new Error("No se pudo conectar con el servidor");
    }
  }
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