import React, { useState } from 'react';
import './Inicio.css';
const Login = () => {
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
    // Aquí puedes agregar la lógica de autenticación, como enviar los datos al servidor
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
      </form>
      </div>
    </div>
  );
};

export default Login;
