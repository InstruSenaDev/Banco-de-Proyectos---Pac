import React, { Children } from 'react';
import RadioButton2 from '../Components/RadioButton2'; // Si necesitas usar un componente específico para los radio buttons

const Grid = ({ Text1, id1, id2, name, categoria, seleccionado, onChange, nuevaColumnaContenido}) => {
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
            <label htmlFor={id1} className="mr-4">
              <input
                type="radio"
                id={id1}
                name={name}
                value="Sí"
                checked={seleccionado === "Sí"}
                onChange={onChange}
              />
              <span className="md:hidden">Sí</span>
            </label>
          </div>

          {/* Columna No */}
          <div className="col-span-6 md:col-span-1 flex justify-center items-center space-x-2">
            <label htmlFor={id2}>
              <input
                type="radio"
                id={id2}
                name={name}
                value="No"
                checked={seleccionado === "No"}
                onChange={onChange}
              />
              <span className="md:hidden">No</span>
            </label>
          </div>

          {/* Columna Nueva */}
          <div className="col-span-6 md:col-span-12  flex justify-center items-center">
            {nuevaColumnaContenido}
          </div>
        </div>
        {/* Añadir más filas aquí si es necesario */}
      </div>
    </div>
  );
};

export default Grid;
