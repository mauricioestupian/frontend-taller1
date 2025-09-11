// src/api/asignaciones.js
export const asignarEmpleado = async (dto) => {
  const response = await fetch('http://localhost:8080/api/asignaciones', {
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