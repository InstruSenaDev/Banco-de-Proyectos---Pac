import React from 'react';
import AceptarTerminos from './AceptarTerminos';
import RadioButton2 from '../Components/RadioButton2';

const Grid = ({ Text1, id1, id2, name, categoria }) => {
  return (
    <div className="w-full bg-white">
      <div className="grid rounded-lg">
        {/* Filas de la tabla */}
        <div className="grid grid-cols-12 items-center border-b py-4">
          {/* Columna Pregunta */}
          <div className="col-span-12 md:col-span-10 flex items-center pl-4">
            <span className="text-lg">{Text1}</span>
          </div>

          {/* Columna Sí */}
          <div className="col-span-6 md:col-span-1 flex justify-center items-center space-x-2">
            <RadioButton2 Text='' id={id1} name={name} />
            <span className="md:hidden">Sí</span>
          </div>

          {/* Columna No */}
          <div className="col-span-6 md:col-span-1 flex justify-center items-center space-x-2">
            <RadioButton2 Text='' id={id2} name={name} />
            <span className="md:hidden">No</span>
          </div>
        </div>
        {/* Añadir más filas aquí si es necesario */}
      </div>
    </div>
  );
};

export default Grid;
