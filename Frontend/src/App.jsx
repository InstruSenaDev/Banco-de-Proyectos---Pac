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
        <Route path="/SuperAdmin/dashboard" element={<Dashboard />} />
        <Route path="/SuperAdmin/usuarios" element={<Usuarios />} />
        <Route path="/SuperAdmin/Prueba" element={<Prueba/>} />
        <Route path="/SuperAdmin/proyectos" element={<Proyectos/>} />
        <Route path="/SuperAdmin/areas" element={<Areas/>} />
        <Route path="/SuperAdmin/tipodearea" element={<TipoArea/>} />
        <Route path="/SuperAdmin/objetivos" element={<Objetivos/>} />
        <Route path="/SuperAdmin/alcance" element={<Alcance/>} />
        <Route path="/SuperAdmin/items" element={<Items/>} />
        <Route path="/SuperAdmin/ficha" element={<Ficha/>} />
      </Routes>
    </Router>
  );
};

export default App;
