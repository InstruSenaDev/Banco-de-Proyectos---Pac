import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Alcance from './Pages/Alcance';
import Dashboard from './Pages/Dashboard';
import Prueba from './Pages/Prueba';
import Calificar from './Pages/Calificar';
import Detalle from './Pages/Detalle';

function App() {
  const [count, setCount] = useState(0);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Calificar />} />
        <Route path="/Detalle/:id" element={<Detalle />} />
        {/* Activa las rutas que necesites */}
        {/* <Route path="/alcance" element={<Alcance />} /> */}
        {/* <Route path="/prueba" element={<Prueba />} />
        <Route path="/calificar" element={<Calificar />} />
        <Route path="/detalle" element={<Detalle />} /> */}
      </Routes>
    </Router>
  );
}

export default App;
