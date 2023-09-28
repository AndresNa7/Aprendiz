import React from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import './Navbar.css'; // Importa un archivo CSS para los estilos
import miImagen from "../src/pages/img/Logo.png";


function Navbar() {
  const { state } = useLocation();
  console.log(state);


  return (
    <div className="navbar-container">
      <header className="navbar">
        <h1 className='panel'>
        <img src={miImagen} alt="Logo de bienestar" />
        </h1>
        {state?.logged ? (
          <div className="user">
            <span className="userName">{state?.name}</span>
            <button className="btn-logout">Cerrar sesión</button>
          </div>
        ) : (
          <nav className='rutas'>
            <Link to="/Inicio">Iniciar sesión</Link>
            <Link to="/Registro">Registrarse</Link>
          </nav>
        )}
      </header>
      <Outlet />
    </div>
  );
}


export default Navbar;


