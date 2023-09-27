import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import  Navbar  from '../Navbar';
import Inicio from '../pages/Inicio'
import Registro from '../pages/Registro'
import Panel from '../pages/Panel'
import Home from '../pages/Home'



const NARouters = () => {
  return (
    <Router>
      <Routes>
        <Route path ="/" element={<Navbar/>}/>
        <Route path="/Home" element={<Home/>} />
        <Route path="/inicio" element={<Inicio/>} />
        <Route path="/registro" element={<Registro/>} />
        <Route path="/panel" element={<Panel/>} />
      </Routes>        
    </Router> 
  );
};

export default NARouters;

