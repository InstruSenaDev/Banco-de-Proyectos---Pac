// eslint-disable-next-line no-unused-vars
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
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



const App = () => {
  return (
    <Router>
      <Routes>
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
};

export default App;
