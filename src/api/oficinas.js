export const obtenerOficinas = async () => {
  const res = await fetch("http://localhost:8080/api/oficinas");
  if (!res.ok) throw new Error("Error al obtener oficinas");
  return res.json();
};