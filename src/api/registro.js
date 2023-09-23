// registro.js

// Función para hacer la solicitud POST
export const registrarUsuario = async (datosUsuario) => {
    try {
      const response = await fetch('https://proyecto-backend-sgbienestar.onrender.com/registro', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(datosUsuario), // datosUsuario contiene los datos del formulario
      });
  
      if (!response.ok) {
        throw new Error('Error en la solicitud');
      }
  
      const responseData = await response.json();
      return responseData;
    } catch (error) {
      console.error('Error:', error);
      throw error;
    }
  };