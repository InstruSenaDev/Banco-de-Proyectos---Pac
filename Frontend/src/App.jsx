// eslint-disable-next-line no-unused-vars
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Dashboard from './Pages/Dashboard';
import ModalUsuario from './Components/ModalUsuario';
import Areas from './Components/Areas';
import GridList from './Pages/GridList'
import GridListUsuarios from './Pages/GridListUsuarios'


const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/Dashboard" element={<Dashboard />} />
        <Route path="/usuarios" element={<GridListUsuarios />} />
        <Route path="/ModalUsuario" element={<ModalUsuario />} />
        <Route path="/Areas" element={<Areas />} />
        <Route path="/GridList" element={<GridList/>} />


      </Routes>
    </Router>
  );
};

export default App;
