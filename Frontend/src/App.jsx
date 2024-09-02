import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Alcance from './Pages/Alcance';
import Dashboard from './Pages/Dashboard';
import Prueba from './Pages/Prueba';
import Calificar from './Components/Card.jsx';
import Detalle from './Pages/Detalle';
import Objetivos from './Pages/Objetivos';

function App() {
  const [count, setCount] = useState(0);

  return (
    <Router>
      <Routes>
        {/* Define las rutas correctamente */}
        <Route path="/" element={<Calificar />} />
      </Routes>
    </Router>
  );
}

export default App;