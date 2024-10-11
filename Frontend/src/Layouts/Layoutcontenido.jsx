import React from 'react';

const Layoutcontenido = ({ children }) => {
  return (
    <main className='p-8 sm:pt-12 sm:pb-20 sm:pl-32 sm:pr-20 ' >
      <div className="w-full min-h-screen p-8 rounded-lg bg-white">
        {children}
      </div>
      </main>
  );
};

export default Layoutcontenido;