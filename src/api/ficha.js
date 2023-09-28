async function obtenerFichas() {
    const url = 'https://proyecto-backend-sgbienestar.onrender.com/ficha'; // Reemplaza con la URL correcta
  
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error('No se pudo obtener la lista de fichas');
        }
        const data = await response.json();

        // Procesar los datos para obtener el nombre y el número de la ficha
        const fichas = {};
        data.forEach((ficha) => {
            fichas[ficha.codigo] = fichas.nombre;
        });

        return fichas;
    } catch (error) {
        throw new Error(`Error al obtener fichas: ${error.message}`);
    }
}

export { obtenerFichas };

