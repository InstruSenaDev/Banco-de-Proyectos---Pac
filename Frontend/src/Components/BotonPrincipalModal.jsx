import React, { useState } from 'react';

const BotonPrincipal = ({ Text, className, id }) => {
  const [active, setActive] = useState(false);

  const handleClick = (event) => {
    setActive(true);

    // Reiniciar la clase de fondo en todos los botones
    setTimeout(() => {
      setActive(false);
    }, 500); // Duración del efecto de cambio

    // Aquí podrías agregar más lógica si es necesario
  };

  return (
    <button
      id={id}
      className={`relative cursor-pointer font-semibold overflow-hidden z-10 border border-[#A3E784] group w-[175px] h-[44px] py-[10px] rounded-[5px] mt-3 self-center ${className || ''} ${active ? 'bg-[#A3E784]' : ''}`}
      onClick={handleClick}
    >
      <span className="relative z-10 text-black group-hover:text-black text-[18px] duration-500">
        {Text}
      </span>
      <span className="absolute w-full h-full bg-[#A3E784] -left-32 top-0 -rotate-45 group-hover:rotate-0 group-hover:left-0 duration-500"></span>
      <span className="absolute w-full h-full bg-[#A3E784] -right-32 top-0 -rotate-45 group-hover:rotate-0 group-hover:right-0 duration-500"></span>
    </button>
  );
};

export default BotonPrincipal;