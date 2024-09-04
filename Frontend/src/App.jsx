import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import UpdatePassword from './Pages/UpdatePassword';
import OlvidarContraseña from './Pages/OlvidarContraseña';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<OlvidarContraseña />} />
        <Route path="/UpdatePassword" element={<UpdatePassword />} />
        {/* otras rutas */}
      </Routes>
    </Router>
  );
}

export default App;