export async function obtenerRol() {
    const url = 'https://proyecto-backend-sgbienestar.onrender.com/rol'; // Reemplaza con la URL correcta
  
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error('No se pudo obtener la lista de EPS');
      }
      const data = await response.json();
      return data;
    } catch (error) {
      throw new Error(`Error al obtener EPS: ${error.message}`);
    }
  }