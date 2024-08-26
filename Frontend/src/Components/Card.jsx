import React from 'react';
import BotonSegundo from './BotonSegundo';

const Card = ({ Text }) => {
  return (
    <>
      <div className="w-100 h-60 bg-[#FBFCFF] rounded-xl border-2 border-[#FBFCFF] shadow-lg flex flex-col items-center justify-center absolute p-8 md:m-8 hover:border-[#A3E784] transition duration-300">
        <h2 className="text-2xl md:text-2xl font-josefin-slab mb-4 text-center leading-tight p-4 font-bold">
          {Text}
        </h2>
        <div className="w-full md:w-auto text-sm md:text-base">
          <BotonSegundo Text="Seleccionar" />
        </div>
      </div>
    </>
  );
};

export default Card;
