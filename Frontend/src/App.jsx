import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import UpdatePassword from './Pages/Principal/UpdatePassword';
import OlvidarContraseña from './Pages/Principal/OlvidarContraseña';
import EditarPerfil from './Pages/Usuario/EditarPerfil'
import Inicio from './Pages/Principal/Inicio'
import Registro from './Pages/Principal/Registro1'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Inicio/>} />
        <Route path="/UpdatePassword" element={<UpdatePassword />} />
        {/* otras rutas */}
      </Routes>
    </Router>
  );
}

export default App;