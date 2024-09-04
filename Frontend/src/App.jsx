import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Calificar from './Pages/Calificar';
import Detalle from './Pages/Detalle';
import Objetivos from './Pages/Objetivos';

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

      </Routes>
    </Router>
  );
}

export default App;
