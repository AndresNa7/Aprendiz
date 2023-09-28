import React, { useState,useEffect } from 'react';
import Autocomplete from "../components/Autocomplete";
import Button from "../components/Button";
import Desplegable from "../components/Desplegable";
import Fecha from "../components/Fecha";
import Input from "../components/Input";
import Politicas from "../components/Politicas";
import Password from "../components/Password";
import miImagen from "./img/Logo.png";
import "./Registro.css";
import { registrarUsuario } from '../api/registro';
import { obtenerFichas } from '../api/ficha'; 
import { obtenerEPS } from '../api/Eps'; 
import { obtenerdominio } from '../api/Dominio';
import { obtenerRol } from '../api/rol';
 



  //la parte de registro
  const Registro = () => {
const navigate=useNavigate();

    const handleClick = () => {
      alert('¡Botón clickeado!');
     
    };
    const [formData, setFormData] = useState({
      nombres: '',
      apellidos: '', 
      
    });
    const handleSubmit = async (event) => {
      event.preventDefault();
      navigate('/Panel',{
        replace:true,
        state:{
          logged: true,
          nombres,

        }
      });
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
        options={Object.entries(fichas).map(([codigo]) => {
          return ({
            value: codigo,
            label: `ficha: ${codigo}`,
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
           className = 'tipo sangre'
      label="Tipo de Sangre"
        options={[
          { value: "Tipo de sangre", label: "Tipo de sangre" },
          { value: "a+", label: "A+ " },
          { value: "o+", label: "O+" },
          { value: "b+", label: "B+" },
        ]}
      />
      <Input label="Dirección" />
      <a href="#" onClick={mostrarInformacionPersonal}>Atrás</a>
      <Button label="Registrar" onClick={handleClick} />
      <Politicas label="Politicas*" />
      
        </div>
      )}
    </form>
  </div>
 
);
};
export default Registro;