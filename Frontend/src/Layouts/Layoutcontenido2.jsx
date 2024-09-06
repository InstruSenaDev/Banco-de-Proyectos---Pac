import React from 'react';

const Layoutcontenido2 = ({ title, text1, children }) => {
  return (
    <main className="flex flex-col justify-center items-center h-screen min-w-full">
      <div className="w-full flex justify-center">
        <h1 className="text-3xl font-bold font-josefin-slab text-center m-8">{text1}</h1>
      </div>
      <div className="w-2/3 md:w-2/4 h-full bg-white rounded-lg border-none p-0 md:p-8 mb-8 border-Borde_gris mx-4 md:mx-40 flex flex-col items-center justify-center">
        {children}
      </div>
    </main>
  );
};

export default Layoutcontenido2;