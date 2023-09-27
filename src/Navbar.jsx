import React from 'react'
import { Link, Outlet, useLocation } from 'react-router-dom'
function navbar() {
  const {state} =useLocation()
  console.log (state);
 return(
  <>
  <header>
  <h1><Link to="/panel"> logo</Link></h1>
  

  {
    state?.logged ?(
      <div className="user">
      <span className="userName">{state?.name}</span>
      <button className='btn-logout'>Cerrar sesion</button>
    </div>
    ) : (

<nav>
    <Link to='/Inicio'> Iniciar sesion </Link>
    <Link to='/Registro'> Registrarse</Link>
  </nav>
    )}
 
  </header>
  
      
      <Outlet/>
  
  
  </>
 )
}

export default navbar;