import React from 'react';
import { Routes, Route} from 'react-router-dom';
//import ModalUsuario from "../Components/ModalUsuario";
//import Areas from "../Components/Areas";
import TipoArea from './Components/TipoAreas';


function App() {
  return (
    <div className="App">
      <Routes>
   {/*<Route path="/" element={<ModalUsuario/>} />
      <Route path="/" element={<Areas/>} /> */}
      <Route path="/" element={<TipoArea/>} />

      </Routes>
    </div>
  );
}

export default App;
