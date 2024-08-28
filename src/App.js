import React from 'react';

import Grid from './Components/Grid.jsx';// Asegúrate de tener el archivo CardAreas.jsx

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Mi Aplicación</h1>
      </header>
      <main>
        <Grid
          Text1="¿Acepta los términos?"
          id1="si"
          id2="no"
          name="aceptar_terminos"
        />
      </main>
    </div>
  );
}

export default App;
