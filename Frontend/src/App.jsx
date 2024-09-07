// eslint-disable-next-line no-unused-vars
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Dashboard from './Pages/Dashboard';
import Usuarios from './Pages/Usuarios';
import Prueba from './Pages/Prueba';
import Proyectos from './Pages/Proyectos';
import Areas from './Pages/Areas';




const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/Dashboard" element={<Dashboard />} />
        <Route path="/usuarios" element={<Usuarios />} />
        <Route path="/Prueba" element={<Prueba/>} />
        <Route path="/proyectos" element={<Proyectos/>} />
        <Route path="/areas" element={<Areas/>} />
      </Routes>
    </Router>
  );
};

export default App;
