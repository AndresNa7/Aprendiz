import React, { useState } from 'react';
import './Inicio.css';
import { useNavigate } from 'react-router-dom';
const Login = () => {
  const navigate= useNavigate

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate('/Panel',{
      replace:true,
      state:{
        logged: true,
        email,
        password
      }
    })
    onResetFrom(); 
  };
      
    const handleForgotPassword = () => {
      const email = prompt('Por favor, ingresa tu dirección de correo electrónico:');
      if (email) {
        // Aquí puedes enviar una solicitud al servidor para restablecer la contraseña
        // Esto podría implicar enviar una solicitud POST al servidor con el correo electrónico
        // Luego, el servidor enviaría un correo electrónico con un enlace de restablecimiento de contraseña
      }
    };


  return (
    <div className='contenedor'>
      <h2>Iniciar Sesión</h2>
      <div className="contenedor-hijo">
      <form onSubmit={handleSubmit}>
        <div>
          <label className='inicio-correoinst' htmlFor="email">Correo Institucional:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label className='contraseña' htmlFor="password">Contraseña:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
            required
          />
        </div>
        <button type="submit">Iniciar Sesión</button>
        <p>
        <a href="#" onClick={handleForgotPassword}>¿Olvidaste la contraseña?</a>
      </p>
      </form>
      </div>
    </div>
  );
};

export default Login;
