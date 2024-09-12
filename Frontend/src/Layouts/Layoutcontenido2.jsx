import React from 'react';

const Layoutcontenido2 = ({ text1, children }) => {
  return (
    <main className="pt-12 pb-28 pl-44 pr-28 ">
      <div className="w-full flex justify-center lg:mt-0">
        <h1 className="text-3xl font-bold font-josefin-slab text-center m-8">{text1}</h1>
      </div>
      <div className="w-full min-h-screen p-8 rounded-lg bg-white ">
        {children}
      </div>
    </main>
  );
};

export default Layoutcontenido2;
