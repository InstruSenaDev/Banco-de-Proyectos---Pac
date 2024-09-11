import React from 'react';
import RadioButton2 from '../Components/RadioButton2';
import { Evaluar } from '../Components/Evaluar';

const Grid = ({ Text1, id1, id2, name, seleccionado, onChange, handleEvaluarChange, id, calificacion }) => {
  const handleRadioChange = (value) => {
    onChange(id, value);
  };

  const handleEvaluarChangeWrapper = (value) => {
    handleEvaluarChange(id, value);
  };

  return (
    <div className="w-full bg-white">
      <div className="rounded-lg">
        <div className="grid grid-cols-1 sm:grid-cols-12 items-center border-b py-2 sm:py-4 px-2 sm:px-4 gap-y-2 sm:gap-y-0">
          <div className="col-span-1 sm:col-span-4 md:col-span-6 flex items-center sm:pl-4">
            <span className="text-base sm:text-lg">{Text1}</span>
          </div>
          <div className="col-span-1 sm:col-span-4 flex justify-center items-center space-x-6">
            <RadioButton2
              Text="Sí"
              id={id1}
              name={name}
              checked={seleccionado === "Sí"}
              onChange={() => handleRadioChange("Sí")}
            />
            <RadioButton2
              Text="No"
              id={id2}
              name={name}
              checked={seleccionado === "No"}
              onChange={() => handleRadioChange("No")}
            />
          </div>
          <div className="col-span-1 sm:col-span-4 md:col-span-2 flex justify-center items-center mt-2 sm:mt-0">
          <Evaluar 
            onChange={handleEvaluarChangeWrapper} 
            initialValue={calificacion ? (calificacion === "Aprobado" ? "1" : "2") : null}
          />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Grid;