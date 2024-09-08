import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Inicio from './Pages/Principal/Inicio';
import Registro1 from './Pages/Principal/Registro1';
import Home from './Pages/Principal/Home';
import OlvidarContraseña from './Pages/Principal/OlvidarContraseña'
import UpdatePassword  from './Pages/Principal/UpdatePassword';
import VistaUsuario from './Pages/Usuario/VistaUsuario'
import VistaMisProyecto from './Pages/Usuario/VistaMisProyecto'
import EditarPerfil from './Pages/Usuario/EditarPerfil'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Inicio" element={<Inicio />} />
        <Route path="/Registro1" element={<Registro1 />} />
        <Route path="/OlvidarContraseña" element={<OlvidarContraseña />} />
        <Route path="/UpdatePassword" element={<UpdatePassword />} />
        <Route path="/VistaUsuario" element={<VistaUsuario/>} />
        <Route path="/VistaMisProyecto" element={<VistaMisProyecto/>} />
        <Route path="/EditarPerfil" element={<EditarPerfil/>} />


      </Routes>
    </Router>
  );
}

export default App;