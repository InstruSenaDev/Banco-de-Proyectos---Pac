import React from 'react';
import Layoutprincipal from '../layouts/Layoutprincipal';
import BarraPreguntas from '../Components/BarraPreguntas';
import Grid from '../Components/Grid';
import BotonPrincipal from '../Components/BotonPrincipal';
import BotonSegundo from '../Components/BotonSegundo';

const Alcance = () => {
  return (
    <Layoutprincipal title="">
      <div className="flex justify-center min-h-screen">
        <div className="p-10 w-full max-w-7xl my-10">
          <div className="flex flex-col space-y-8">
            <div className="text-left mb-4">
              <h1 className="font-josefin-slab text-2xl text-black">
                Por favor marque “SI” o “NO” en cada pregunta
              </h1>
            </div>

            <div className="flex justify-center">
              <BarraPreguntas Text1="Alcance" Text2="Si" Text3="No" />
            </div>

            <div className="text-2xl font-bold mb-2 pl-12">
              Operación y costos
            </div>

            <Grid
              Text1="1. ¿El objetivo principal del software es mejorar la eficiencia operativa de su empresa?"
              id1="termsCheckbox1-grid1"
              id2="termsCheckbox2-grid1"
            />
            <Grid
              Text1="1. ¿El objetivo principal del software es mejorar la eficiencia operativa de su empresa?"
              id1="termsCheckbox1-grid2"
              id2="termsCheckbox2-grid2"
            />

            <div className="flex flex-col items-center sm:flex-row justify-end space-y-2 sm:space-y-0 sm:space-x-4">
              <a href="/VistaObjetivos">
                <BotonPrincipal Text="Volver" />
              </a>
              <a href="/VistaAlcance">
                <BotonSegundo Text="Siguiente" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </Layoutprincipal>
  );
};

export default Alcance;
