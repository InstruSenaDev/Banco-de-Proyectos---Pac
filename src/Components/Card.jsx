import React from 'react';

const Card = ({ text }) => {
  return (
    <div className="w-80 h-60 bg-Color_carta rounded-lg shadow-lg flex flex-col items-center justify-center adsolute p-8 m-8">
    <h2 className="text-2xl font-nunito-sans mb-4 text-center leading-tight p-4"> {text} </h2>
    <button
    className="group cursor-pointer outline-none hover:rotate-90 duration-300">

    <svg className="stroke-Verde fill-none group-active:duration-0 duration-300"
    viewBox="0 0 24 24"
    height="60px"
    width="60px"
    xmlns="http://www.w3.org/2000/svg">

    <path
    stroke-width="1.5" d="M12 22C17.5 22 22 17.5 22 12C22 6.5 17.5 2 12 2C6.5 2 2 6.5 2 12C2 17.5 6.5 22 12 22Z"></path>

    <path stroke-width="1.5" d="M8 12H16"></path>
    <path stroke-width="1.5" d="M12 16V8"></path>
    </svg>
    </button>
</div>
  );
};

export default Card;
