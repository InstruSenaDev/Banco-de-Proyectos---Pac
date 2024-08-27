import React from 'react';

import AceptarTerminos from './Components/AceptarTerminos';
import EstadoAprobado from './Components/EstadoAprobado';
import BotonEditar from './Components/BotonEditar';
import BotonPrincipal from './Components/BotonPrincipal';
import BotonSegundo from './Components/BotonSegundo';
import Card from './Components/Card';
import EstadoDevuelto from './Components/EstadoDevuelto';
import EstadoRechazado from './Components/EstadoRechazado';
import RadioButton2 from './Components/RadioButton2';
import Grid from './Components/Grid';
import Grid2 from './Components/Grid2';
import GridDevolver from './Components/GridDevolver';
import Input from './Components/Input';
import Modal from './Components/Modal';
import Navbar from './Components/Navbar';
import Navbar2 from './Components/Navbar2';

import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
    <div className="App">

    <div>
      <AceptarTerminos text="ssss" id=""/>
    </div>

      <div>
        <EstadoAprobado />
      </div>

      <div>
        <EstadoDevuelto />
      </div>

      <div>
        <EstadoRechazado />
      </div>

      <div>
        <BotonEditar />
      </div>

      <div>
        <BotonPrincipal className="" Text="ss" id="" />
      </div>

      <div>
        <BotonSegundo text="ss" id="" />
      </div>

      <div>
        <Card text="ss" />
      </div>

      <div>
        <RadioButton2 name="" value="" id="" />
      </div>

      <div>
        <Grid Text1="ddddddddddd" id1="" id2="" name="" />
      </div>

      <div>
        <Grid2 text1="ddddddddddd"></Grid2>
      </div>

      <div>
        <GridDevolver text1="ddddddddddd" />
      </div>

      <div>
        <Input placeholder="" type="" Text="" id="" />
      </div>

      <div>
        <Modal text="jjdjkjkjjj" />
      </div>

      <div>
        <Navbar text="jjdjkjkjjj" />
      </div>

      <div>
        <Navbar2 text="jjdjkjkjjj" />
      </div>




    </div>
      </header>
    </div>
  );
}

export default App;
