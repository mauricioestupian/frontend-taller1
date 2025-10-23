//creamos una variable para la URL base de la API, en un futuro si cambiamos la URL, solo se cambia en un lugar
const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:8080";

export const obtenerProyectos = async () => {
  try {
    const res = await fetch(`${BASE_URL}/api/proyectos`);
    // Manejo de errores HTTP
    //Si el backend responde con error HTTP (404, 500…), se lanza 
    if (!res.ok) throw new Error("Error al obtener proyectos");
    return await res.json();
  } catch (error) {
    // Detecta si el backend está caído
    if (error.message.includes("Failed to fetch") || error.message.includes("NetworkError")) {
      throw new Error("No se pudo conectar con el servidor");
    }
    throw error;
  }
};

export const obtenerProyectoPorId = async (id) => {
  const response = await fetch(`${BASE_URL}/api/proyectos/${id}`);
  if (!response.ok) throw new Error("Error al obtener el proyecto");
  return await response.json();
};

export const actualizarProyecto = async (id, datos) => {
  const response = await fetch(`${BASE_URL}/api/proyectos/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(datos),
  });
  if (!response.ok) throw new Error("Error al actualizar el proyecto");
  return await response.json();
};

export const crearProyecto = async (datos) => {
  const response = await fetch(`${BASE_URL}/api/proyectos`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(datos),
  });
  if (!response.ok) throw new Error("Error al crear el proyecto");
  return await response.json();
}


