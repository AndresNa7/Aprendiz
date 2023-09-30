import React, { useState,useEffect } from 'react';
import Autocomplete from "../components/Autocomplete";
import Button from "../components/Button";
import Desplegable from "../components/Desplegable";
import Fecha from "../components/Fecha";
import Input from "../components/Input";
import SpringModal from "../components/SpringModal";
import Password from "../components/Password";
import miImagen from "./img/Logo.png";
import "./Registro.css";
import { registrarUsuario } from '../api/registro';
import { obtenerFichas } from '../api/ficha'; 
import { obtenerEPS } from '../api/Eps'; 
import { obtenerdominio } from '../api/Dominio';
import { obtenerRol } from '../api/rol';
import Select from 'react-select';



  //la parte de registro
  const Registro = () => {
    const handleClick = () => {
      alert('¡Botón clickeado!');
     
    };
    const [formData, setFormData] = useState({
      nombres: '',
      apellidos: '', 
      
    });
    const handleSubmit = async (event) => {
      event.preventDefault();

  // la parte de peticiones dedominio, rol
      try {
        const obtener = await obtenerdominio()
        console.log(obtener)
        const obtener2 = await obtenerRol()
        console.log(obtener2)
       const responseData = await registrarUsuario(formData);
       console.log('Respuesta del servidor:', responseData);
      } catch (error) {
        console.error('Error al registrar usuario:', error);
      }
    };
  
    //la parte de transicion
    const [seccionActual, setSeccionActual] = useState("informacionPersonal");
    const mostrarInformacionCuenta = () => {
    setSeccionActual("informacionCuenta");
    };
    const mostrarInformacionPersonal = () => {
    setSeccionActual("informacionPersonal");
  };
  //la parte de validacion de apellido 
  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    // Validar si el campo de apellidos está vacío y establecer un error si es necesario
    if (name === 'apellidos' && value.trim() === '') {
      setErrors({ ...errors, [name]: 'Apellidos es obligatorio' });
    } else {
      // Borrar el error si el campo se ha completado
      setErrors({ ...errors, [name]: '' });
    }
  };
//
  const [epsOptions, setEpsOptions] = useState([]);
  const [selectedEPS, setSelectedEPS] = useState(null);

  useEffect(() => {
    obtenerEPS()
      .then((data) => {
        // Convierte los datos de EPS en el formato adecuado para react-select
        const options = data.map((eps) => ({
          value: eps._id,
          label: eps.nombre,
        }));
        setEpsOptions(options);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const handleEPSChange = (selectedOption) => {
    setSelectedEPS(selectedOption);
  };

  // 

  const [fichas, setFichas] = useState({});
  const [selectedFicha, setSelectedFicha] = useState(null);

  useEffect(() => {
    obtenerFichas()
      .then((data) => {
        setFichas(data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  
return (
  <div>
    <img src={miImagen} alt="Logo de bienestar" />
    <h1>REGISTRO</h1>
    <h6>
      <br />No tienes una cuenta? Regístrate aquí
    </h6>
    <form onSubmit={handleSubmit}>
      
      {seccionActual === "informacionPersonal" && (
        <div style={{ position: 'relative' }}>
    <input
    className='nombre'
    type="text"
    name="nombres"
    label="Nombres*"
    placeholder="nombres*"
    value={formData.nombres}
    onChange={handleInputChange}
    required
  />
      {formData.nombres === 'nombres' && (
      <span className="error-message" style={{ position: 'absolute', top: '40px', left: '0', color: 'red', fontSize: '12px' }}>
      Este campo es obligatorio.
      </span>
    )}
    <div style={{ position: 'relative' }}>
    <input
    type="text"
    name="apellidos"
    label="Apellidos*"
    placeholder="apellidos*"
    value={formData.apellidos}
    onChange={handleInputChange}
    required
  />
  {formData.apellidos === '' && (
    <span className="error-message" style={{ position: 'absolute', top: '40px', left: '0', color: 'red', fontSize: '12px' }}>
      Este campo es obligatorio.
    </span>
  )}
</div>
       <Desplegable
        label="Tipo de Documento*"
        options={[
          { value: "Tipo de Documento", label: "Tipo de Documento" },
          { value: "Tarjeta de identidad", label: "Tarjeta de identidad" },
          { value: "cedula", label: "Cédula" },
          { value: "otro", label: "Otro" },
        ]}
      />
      <Fecha label="Fecha de Nacimiento" />
          <input
            type="text"
            name="correoPersonal"
            placeholder="Correo Personal*"
            value={formData.correoPersonal}
            onChange={handleInputChange}
          />
      <Input label="Teléfono" />
      <Input label="Correo Institucional" />
      <Password labelText="Contraseña" />
      <Password labelText="Confirmación Contreseña" />
      <a href="#" onClick={mostrarInformacionCuenta}>Siguiente</a>

        </div>
      )}
      {seccionActual === "informacionCuenta" && (
        <div>
      <Desplegable
      label="Genero*"
        options={[
          { value: "Seleccionar Genero", label: "Seleccionar Genero" },
          { value: "masculino", label: "Masculino" },
          { value: "femenino", label: "Femenino" },
          { value: "otro", label: "Otro" },
        ]}
      />
   

   <Desplegable
      label="Rol*"
        options={[
          { value: "Rol", label: "Rol" },
          { value: "aprendiz", label: "Aprendiz" },
          { value: "instructor", label: "Instructor" },
          { value: "administrador", label: "Administrador" },
        ]}
      />
       <Select
        options={Object.entries(fichas).map(([codigo,nombre]) => {
          return ({
            value: codigo,
            label: `ID: ${codigo}, Nombre: ${nombre}`,
          });
        })}
        value={selectedFicha}
        onChange={(selectedOption) => setSelectedFicha(selectedOption)}
        placeholder="Selecciona una ficha..."
      />
    
      <Select
        value={selectedEPS}
        onChange={handleEPSChange}
        options={epsOptions}
        placeholder="Elije una EPS..."
      />
    
           <Desplegable
      label="Tipo de Sangre"
        options={[
          { value: "Tipo de sangre", label: "Tipo de sangre" },
          { value: "a+", label: "A+ " },
          { value: "o+", label: "O+" },
          { value: "b+", label: "B+" },
        ]}
      />
      <Input label="Dirección" />

      <SpringModal
      buttonText='Política de Privacidad y Seguridad'
      modalTitle='Política de Privacidad y Seguridad de "Bienestar al Aprendiz"'
      modalContent={`Bienvenido a "Bienestar al Aprendiz" ("Nosotros", "nuestra" o "nuestro"). Tu privacidad y seguridad son fundamentales para nosotros. Esta Política de Privacidad y Seguridad describe cómo recopilamos, usamos, divulgamos y protegemos tu información personal y cómo mantenemos la seguridad de nuestros servicios. Al utilizar "Bienestar al Aprendiz", aceptas las prácticas descritas en esta política.

      1. Información que Recopilamos
      
      Recopilamos información que proporcionas directamente cuando utilizas nuestra aplicación, como tu nombre, dirección de correo electrónico, información de contacto y cualquier otra información que decidas compartir con nosotros. También podemos recopilar información automáticamente, como registros de servidores y datos de uso, cuando accedes a nuestros servicios.
      
      2. Uso de la Información
      
      Utilizamos la información que recopilamos para proporcionar, mantener, mejorar y proteger nuestros servicios, así como para cumplir con nuestras obligaciones legales. Esto puede incluir:
      
      Personalizar y mejorar tu experiencia en la aplicación "Bienestar al Aprendiz".
      Enviar comunicaciones relacionadas con el servicio y notificaciones importantes.
      Analizar el rendimiento de la aplicación y solucionar problemas técnicos.
      Cumplir con las leyes y regulaciones aplicables.
      3. Divulgación de la Información
      
      No compartimos tu información personal con terceros, excepto en las siguientes circunstancias:
      
      Cuando has dado tu consentimiento para compartir información específica.
      Para cumplir con una orden judicial o requerimiento legal.
      Con proveedores de servicios de confianza que nos ayudan a ofrecer nuestros servicios.
      En caso de una fusión, adquisición o venta de activos de la empresa.
      4. Seguridad de la Información
      
      Tomamos medidas razonables para proteger la información personal que recopilamos y mantenemos en "Bienestar al Aprendiz". Esto incluye medidas de seguridad físicas, electrónicas y administrativas para proteger contra el acceso no autorizado, la divulgación, la alteración o la destrucción de datos.
      
      5. Cookies y Tecnologías Similares
      
      Utilizamos cookies y tecnologías similares para mejorar la funcionalidad y la experiencia del usuario en "Bienestar al Aprendiz". Puedes configurar tu navegador para rechazar todas las cookies o para recibir un aviso cuando se envíe una cookie. Sin embargo, algunas funciones de la aplicación pueden no funcionar correctamente sin cookies.
      
      6. Tus Derechos y Opciones
      
      Tienes derechos relacionados con tus datos personales, incluyendo el derecho a acceder, corregir, eliminar, portar y restringir el procesamiento de tus datos. Puedes ejercer estos derechos en cualquier momento contactándonos a través de [correo electrónico de contacto].
      
      7. Cambios en esta Política
      
      Nos reservamos el derecho de actualizar esta Política de Privacidad y Seguridad en cualquier momento. Te notificaremos sobre cambios significativos en esta política y obtendremos tu consentimiento si es necesario.
      
      8. Contacto
      
      Si tienes preguntas o preocupaciones sobre esta Política de Privacidad y Seguridad, o si deseas ejercer tus derechos relacionados con tus datos personales, contáctanos a través de [correo electrónico de contacto].`}/>

      <a href="#" onClick={mostrarInformacionPersonal}>Atrás</a>
      <Button label="Registrar" onClick={handleClick} />
        </div>
      )}
    </form>
  </div>
 
);
};
export default Registro;
