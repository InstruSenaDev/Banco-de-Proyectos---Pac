import React from 'react';
import Input from '../../Components/Input';
import BotonSegundo from '../../Components/BotonSegundo'; 
import LayoutPrincipal from "../../layouts/LayoutPrincipal";
import Layoutcontenido5 from "../../Layouts/Layoutcontenido5";
import useAreaForm from '../../../hooks/useAreaForm';

const AreaForm = () => {
  const { area, errors, setArea, handleSubmit } = useAreaForm();

  return (
    <LayoutPrincipal title=""> 
      <Layoutcontenido5 title="Crear Areas">
        <div className="w-full md:w-1/2">
          <div className="flex flex-col p-[5%] flex-box space-y-5">
            <div>
              <Input 
                text="Area" 
                placeholder="Area" 
                type="text" 
                id="nombreArea"
                value={area}
                onChange={(e) => setArea(e.target.value)}
              />
              <span className="error-message">{errors.nombre}</span>
            </div>
            <div className="flex justify-center items-center sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4">
              <BotonSegundo 
                text="Agregar" 
                id="guardarBtn"
                onClick={handleSubmit}
              />
            </div>
          </div>
        </div>
      </Layoutcontenido5>
    </LayoutPrincipal>
  );
};

export default AreaForm;
