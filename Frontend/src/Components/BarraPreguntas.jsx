import React from 'react';

const BarraPreguntas = ({ Text1, Text2, Text3, Text4 }) => {
  return (
    <div className="w-full bg-[#A3E784] sm-w-2">
      <div className="grid">
        <div className="grid grid-cols-12 items-center border-b py-2 mt-15 h-20">
          <div className="col-span-10">
            <span className="text-2xl font-josefin-slab font-bold pl-12">{Text1}</span>
          </div>
          <div className="col-span-2 flex items-center justify-center space-x-4">
            <p className="text-2xl font-josefin-slab font-bold">{Text2}</p>
            <p className="text-2xl font-josefin-slab font-bold">{Text3}</p>
            <p className="text-2xl font-josefin-slab font-bold">{Text4}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BarraPreguntas;
