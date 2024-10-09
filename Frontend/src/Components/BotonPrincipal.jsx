import React from 'react';

const BotonPrincipal = ({ Text, className = '', onClick, isSelected, additionalClasses = '' }) => {
  return (
    <button
      className={`relative cursor-pointer font-semibold overflow-hidden z-10 border border-verde group w-[175px] h-[44px] py-[10px] rounded-[5px] mt-3 self-center ${className} ${isSelected ? 'bg-verde' : ''} ${additionalClasses}`}
      onClick={onClick}
    >
      <span className="relative z-10 text-black group-hover:text-black text-[18px] duration-500">
        {Text}
      </span>
      <span className="absolute w-full h-full bg-verde -left-32 top-0 -rotate-45 group-hover:rotate-0 group-hover:left-0 duration-500"></span>
      <span className="absolute w-full h-full bg-verde -right-32 top-0 -rotate-45 group-hover:rotate-0 group-hover:right-0 duration-500"></span>
    </button>
  );
};



export default BotonPrincipal;