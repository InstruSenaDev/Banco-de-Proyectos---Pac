import React from 'react';

const BotonSegundo = ({ Text, onClick, additionalClasses = '', size = 'md' }) => {
  const sizeClasses = {
    sm: 'w-[120px] h-[36px] text-[14px]',
    md: 'w-[180px] h-[44px] text-[16px]',
    lg: 'w-[180px] h-[48px] text-[18px]',
    xl: 'w-[190px]'
  };

  return (
    <div className="flex justify-center sm:justify-end">
      <button
        className={`relative font-semibold font-sans border border-verde bg-verde text-white rounded-[5px] overflow-hidden 
          transition-all duration-700 mt-3 ${sizeClasses[size]} ${additionalClasses}`}
        onClick={onClick}  
      >
        <span className="relative z-10 text-black group-hover:text-black duration-500">
          {Text}
        </span>
        <span className="absolute w-full h-full bg-verde -left-32 top-0 -rotate-45 group-hover:rotate-0 group-hover:left-0 duration-500"></span>
        <span className="absolute w-full h-full bg-verde -right-32 top-0 -rotate-45 group-hover:rotate-0 group-hover:right-0 duration-500"></span>
      </button>
    </div>
  );
};

export default BotonSegundo;