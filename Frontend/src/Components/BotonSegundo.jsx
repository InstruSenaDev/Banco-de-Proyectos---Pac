import React from 'react';

const BotonSegundo = ({ Text, bgColor = 'bg-[#A3E784]', textColor = 'text-white', borderColor = 'border-[#A3E784]', additionalClasses, onClick }) => {
  return (
    <div className="flex justify-end">
      <button
        className={`w-full sm:w-[175px] h-[44px] rounded-[5px] relative font-semibold font-sans 
        after:-z-20 after:absolute after:h-1 after:w-1 after:left-5 overflow-hidden after:bottom-0 
        after:translate-y-full after:rounded-md after:hover:scale-[300] after:hover:transition-all 
        after:hover:duration-700 after:transition-all after:duration-700 transition-all duration-700 mt-3 
        ${bgColor} ${borderColor} ${textColor} ${additionalClasses || ''}`}
        onClick={onClick}  
      >
        <span className="relative text-base sm:text-[18px] duration-500">{Text}</span>
      </button>
    </div>
  );
};

export default BotonSegundo;