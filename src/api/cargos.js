export const obtenerCargos = async () => {
  const res = await fetch("http://localhost:8080/api/cargos");
  if (!res.ok) throw new Error("Error al obtener cargos");
  return res.json();
};