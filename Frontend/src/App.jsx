import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Inicio from './Pages/Principal/Inicio';
import Registro1 from './Pages/Principal/Registro1';
import Home from './Pages/Principal/Home';
import OlvidarContraseña from './Pages/Principal/OlvidarContraseña'
import UpdatePassword  from './Pages/Principal/UpdatePassword';
import VistaUsuario from './Pages/Usuario/VistaUsuario'
import VistaMisProyecto from './Pages/Usuario/VistaMisProyecto'
import EditarPerfil from './Pages/Aprendiz/EditarPerfil'

import Dashboard from './Pages/SuperAdmin/Dashboard';
import Usuarios from './Pages//SuperAdmin/Usuarios';
import Prueba from './Pages//SuperAdmin/Prueba';
import Proyectos from './Pages//SuperAdmin/Proyectos';
import Areas from './Pages//SuperAdmin/Areas';
import TipoArea from './Pages//SuperAdmin/TipodeArea';
import Objetivos from './Pages//SuperAdmin/Objetivos'
import Alcance from './Pages//SuperAdmin/Alcance';
import Items from './Pages//SuperAdmin/Items'
import Ficha from './Pages//SuperAdmin/Ficha';

function App() {
  return (
    
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/Inicio" element={<Inicio />} />
        <Route path="/Registro1" element={<Registro1 />} />
        <Route path="/OlvidarContraseña" element={<OlvidarContraseña />} />
        <Route path="/UpdatePassword" element={<UpdatePassword />} />
        <Route path="/VistaUsuario" element={<VistaUsuario/>} />
        <Route path="/VistaMisProyecto" element={<VistaMisProyecto/>} />
        <Route path="/EditarPerfil" element={<EditarPerfil/>} />

        <Route path="/Dashboard" element={<Dashboard />} />
        <Route path="/usuarios" element={<Usuarios />} />
        <Route path="/Prueba" element={<Prueba/>} />
        <Route path="/proyectos" element={<Proyectos/>} />
        <Route path="/areas" element={<Areas/>} />
        <Route path="/tipodearea" element={<TipoArea/>} />
        <Route path="/objetivos" element={<Objetivos/>} />
        <Route path="/alcance" element={<Alcance/>} />
        <Route path="/items" element={<Items/>} />
        <Route path="/ficha" element={<Ficha/>} />


      </Routes>
    </Router>
  );
}

export default App;