import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Calificar from './Pages/Calificar';
import Detalle from './Pages/Detalle';
import Objetivos from './Pages/Objetivos';
import Alcance from './Pages/Alcance';
import Calificacion from './Pages/Calificacion';
import AsignarProyectos from './Pages/AsignarProyectos';
import Asignados from './Pages/Asignados';

function App() {
  const [count, setCount] = useState(0);

  return (
    <Router>
      <Routes>
        {/* Define las rutas correctamente */}
        <Route path="/" element={<Calificar />} />
        <Route path="/Calificar" element={<Calificar />} />
        <Route path="/Detalle/:id" element={<Detalle />} />
        {/* Ruta para los objetivos del proyecto */}
        <Route path="/respuestas/:idproyecto" element={<Objetivos />} />
        <Route path="/alcance/:idproyecto" element={<Alcance />} />
        <Route path="/calificacion/:idproyecto" element={<Calificacion />} />
        <Route path="/asignar-proyectos" element={<AsignarProyectos />} />
        <Route path="/asignar-proyectos/:idproyecto" element={<AsignarProyectos />} />
        <Route path="/calificar/:idproyecto" element={<Calificacion />} />
        <Route path='/asignados' element={<Asignados />} />
      </Routes>
    </Router>
  );
}

export default App;
