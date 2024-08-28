import { useState } from 'react'
import { BrowserRouter as Router, Route, Routes} from "react-router-dom";
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Alcance from './Pages/Alcance'
import Dashboard from './Pages/Dashboard'
import Prueba from './Pages/Prueba'
import Calificar from './Pages/Calificar'
import Detalle from './Pages/Detalle'


function App() {
  const [count, setCount] = useState(0)

  return (
    <Router>
      <Routes>

      <Route path="/Calificar" element={<Calificar />} />
        {/* Ruta dinámica para mostrar el detalle del proyecto */}
        <Route path="/Detalle/:id" element={<Detalle />} />
      </Routes>
    </Router>

  // {/* <Dashboard/> */}
  // {/* <Alcance/>   */}
  //  {/* <Calificar/> */}
  //  {/* <Detalle/> */}


  );
}

export default App;
