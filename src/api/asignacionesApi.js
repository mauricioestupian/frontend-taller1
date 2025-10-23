//creamos una variable para la URL base de la API, en un futuro si cambiamos la URL, solo se cambia en un lugar
const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:8080/api/asignaciones";

// src/api/asignaciones.js
export const asignarEmpleado = async (dto) => {
  const response = await fetch(`${BASE_URL}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(dto)
  });

  if (!response.ok) {
    throw new Error('Error en la asignación');
  }

  return await response.json();
};

export const asignacionesPorEmpleado = async (id) => {
  const response = await fetch(`${BASE_URL}/empleado2/${id}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  });
  if (!response.ok) {
    throw new Error('Error al obtener las asignaciones por empleado');
  }
  if (response==null) {
    throw new Error('El proyecto no tiene asignaciones');
  } 
  return await response.json();
};

export const asignacionesPorProyecto = async (id) => {
  const response = await fetch(`${BASE_URL}/proyecto2/${id}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  });
  if (!response.ok) {
    throw new Error('Error al obtener las asignaciones por proyecto');
  }
  if (response==null) {
    throw new Error('El proyecto no tiene asignaciones');
  } 
  return await response.json();
};

//eliminar asignaciones masivas
export const eliminarAsignacionesMasivas = async (asignaciones) => {
  const response = await fetch(`${BASE_URL}/eliminar-masivo`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(asignaciones)
  });

  if (!response.ok) {
    throw new Error('Error al eliminar asignaciones');
  }

  return await response.json();
};

export const desvincularAsignacionesMasivas = async (asignaciones) => {
  const response = await fetch(`${BASE_URL}/desvincular-masivo`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(asignaciones)
  });

  if (!response.ok) {
    throw new Error('Error al desvincular asignaciones');
  }

  return await response.json();
};