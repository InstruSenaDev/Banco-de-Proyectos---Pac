import React from 'react';

const Layoutcontenido = ({ children }) => {
  return (
    <main className="flex justify-center items-center min-h-screen w-full p-10">
      <div className="w-full max-w-screen-xl p-8 rounded-lg bg-white">
        {children}
      </div>
    </main>
  );
};

export default Layoutcontenido;
