import React from 'react';
import { Routes, Route} from 'react-router-dom';
/*import Home from './Pages/Home';*/
import Inicio from './Pages/Inicio';

function App() {
  return (
    <div className="App">
      <Routes>
      {/*
        <Route path="/" element={<Home />} /> */}

        <Route path="/Inicio" element={<Inicio/>} />
      </Routes>
    </div>
  );
}

export default App;
