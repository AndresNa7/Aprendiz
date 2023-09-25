import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Registro from '../pages/Registro'
import Inicio from '../pages/Inicio'


const NARouters = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Inicio/>} />
        <Route path="/Registro" element={<Registro/>} />
      </Routes>        
    </Router>
  );
};

export default NARouters;

/*

*/