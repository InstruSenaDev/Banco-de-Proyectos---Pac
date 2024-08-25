import React from 'react';
import '../styles/Editar.css';

const BotonEditar = () => {
  return (
    <label className="flex justify-center items-center p-2 gap-2 h-8 w-20 border border-[#979797] bg-[#d3d2d06f] rounded-sm cursor-pointer hover:bg-[#b8b7b795]">
      <span className="text-[#979797] text-base font-semibold">Editar</span>
    </label>
  );
};

export default BotonEditar;
