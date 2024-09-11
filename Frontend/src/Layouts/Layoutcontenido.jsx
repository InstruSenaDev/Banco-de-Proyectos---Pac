import React from 'react';

const Layoutcontenido = ({ title, children }) => {

  return (
    <>
    <div className="text-center px-20 mt-[1%]">
    <span className="text-2xl font-bold font-josefin-slab text-center">
      {title}
    </span>
  </div>
    
    <main className="flex justify-center items-center min-h-screen min-w-full md:h-auto 2xl:p-10 pl-9 p-10 xl:pl-32 2xl:pl-32 xl:pr-8">
      <div className="xl:w-full 2xl:h-auto lg:w-auto md:h-full h-auto p-8 rounded-lg border-none bg-white">
        {children}
      </div>
    </main>
    </>
  );
};

export default Layoutcontenido;