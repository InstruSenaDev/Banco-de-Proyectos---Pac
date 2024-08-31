// Importaciones de componentes React
import Layoutprincipal from "../Layouts/Layoutprincipal";
import Grid from "../Components/Grid";
import BotonPrincipal from "../Components/BotonPrincipal";
import BotonSegundo from "../Components/BotonSegundo";
import RadioButton from "../Components/RadioButton";
import {Evaluar} from "../Components/Evaluar";

const Objetivos = () => {
  return (
    <Layoutprincipal title="">
      <div className="flex justify-center min-h-screen">
        <div className="p-10 w-full max-w-7xl my-10">
          <div className="flex flex-col">
            <div className="text-left mb-4">
              <h1 className="font-josefin-slab text-2xl text-black">Respuestas</h1>
            </div>

            <div className="grid grid-cols-12 bg-[#A3E784] font-bold py-4 rounded-t-lg border-b">
              <div className="col-span-12 md:col-span-2 text-center md:text-left px-6">OBJETIVOS</div>
            </div>

            {/* Fila de títulos de la tabla */}
            <div className="grid grid-cols-12 bg-green-50 font-semibold py-4 rounded-t-lg border-b">
              <div className="col-span-12 md:col-span-9 text-center md:text-left pl-4">Tipos de objetivos</div>
              <div className="hidden md:flex md:col-span-3 justify-between">
                <div className="col-span-1 text-center">Sí</div>
                <div className="col-span-1 text-center">No</div>
                <div className="col-span-1 text-center">Calificar</div>
              </div>
            </div>

            <div className="grid-cols-12 bg-green-50  md:col-span-10 pl-4  col-span-12  flex  py-2">
              <Grid 
                Text1="Lorem ipsum dolor sit amet consectetur adipiscing elit, a integer conubia eget vel torquent, donec nulla magnis quam est netus." 
                id1="" 
                id2="" 
                name="" 
                categoria="" 
              />
              <Evaluar />
            </div>

            <div className="flex flex-col items-center sm:flex-row justify-end space-y-2 sm:space-y-0 sm:space-x-4">
              <BotonPrincipal Text="Volver" />
              <a href="/VistaAlcance" className="flex flex-col items-center sm:flex-row justify-end space-y-2 sm:space-y-0 sm:space-x-4">
                <BotonSegundo Text="Siguiente" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </Layoutprincipal>
  );
};

export default Objetivos;
