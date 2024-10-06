import React from 'react';
import { useNavigate } from 'react-router-dom';

const BotonSegundo = ({ Text, to, onClick }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    if (to) {
      navigate(to);
    }
  };

  return (
    <div className="flex justify-end">
      <button
        onClick={onClick}
        className="w-[175px] h-[44px] z-30 bg-[#2eb694] rounded-[5px] text-white relative font-semibold font-sans border border-[#2eb694] 
        after:-z-20 after:absolute after:h-1 after:w-1 after:bg-[#2eb694] after:left-5 overflow-hidden after:bottom-0 after:translate-y-full 
        after:rounded-md after:hover:scale-[300] after:hover:transition-all after:hover:duration-700 after:transition-all after:duration-700 
        transition-all duration-700 mt-3" 
      >
        <span className="relative z-10 text-white group-hover:text-black text-[18px] duration-500">
          {Text}
        </span>
      </button>
    </div>
  );
};

export default BotonSegundo;
