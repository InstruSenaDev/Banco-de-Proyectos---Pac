// eslint-disable-next-line no-unused-vars
import React from 'react';

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ObjetivosPrueba from './Pages/ObjetivosPrueba';
import RegistroProyecto from './Pages/RegistroProyecto';
import TiposDeArea from './Pages/Services/TiposDeArea';
import ItemsDeArea from './Pages/Services/ItemsDeArea';
import ObjetivosDeArea from './Pages/Vista_Objetivos/ObjetivosDeArea';
import VistaAreas1 from './Pages/VistaAreas1';
import VistaAlcance from './Pages/VistaAlcance';
import Dashboard from './Pages/Dashboard';
import ModalUsuario from './Components/ModalUsuario';
import Areas from './Components/Areas';


const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/ObjetivosPrueba" element={<ObjetivosPrueba />} />
        <Route path="/RegistroProyecto" element={<RegistroProyecto />} />
        <Route path="/Services/TiposDeArea/:id" element={<TiposDeArea />} />
        <Route path="/Services/ItemsDeArea/:idarea/:idtiposdearea" element={<ItemsDeArea />} />
        <Route path="/Vista_Objetivos/ObjetivosDeArea/:idarea/:idtiposdearea" element={<ObjetivosDeArea />} />
        <Route path="/VistaAreas1" element={<VistaAreas1 />} />
        <Route path="/VistaAlcance/:idproyecto" element={<VistaAlcance />} />
        <Route path="/Dashboard" element={<Dashboard />} />
        <Route path="/ModalUsuario" element={<ModalUsuario />} />
        <Route path="/Areas" element={<Areas />} />

      </Routes>
    </Router>
  );
};

export default App;
