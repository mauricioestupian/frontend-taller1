//creamos una variable para la URL base de la API, en un futuro si cambiamos la URL, solo se cambia en un lugar
const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:8080";

export const obtenerCargos = async () => {
  try {
    const res = await fetch(`${BASE_URL}/api/cargo`);
    // Manejo de errores HTTP
    //Si el backend responde con error HTTP (404, 500…), se lanza 
    if (!res.ok) throw new Error("Error al obtener cargos");
    return await res.json();
  } catch (error) {
    // Detecta si el backend está caído
    if (error.message.includes("Failed to fetch") || error.message.includes("NetworkError")) {
      throw new Error("No se pudo conectar con el servidor");
    }
    throw error;
  }
};

