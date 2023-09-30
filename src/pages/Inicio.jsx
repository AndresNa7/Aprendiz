import React, { useState } from 'react';
import Password from "../components/Password";
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
    <div className='inicio'>
      <div className='contendor'>
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

          <Password
          labelText="Contraseña"
            type="Contraseña"
            id="contraseña"
            name="Contraseña"
            value={formData.password}
            onChange={handleInputChange}
            required
          />
        </div>
        <button type="submit">Iniciar Sesión</button>
      </form>
      </div>
    </div>
    </div>
  );
};

export default Login;

