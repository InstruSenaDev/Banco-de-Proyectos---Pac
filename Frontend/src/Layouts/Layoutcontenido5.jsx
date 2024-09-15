import React from 'react';

const Layoutcontenido5 = ({title,  children}) => {
 
  return (
    <div className="text-center px-30 mt-[1%]">
      <span className="text-2xl font-bold font-nunito-sans text-center">
        {title}
      </span>

      <main className="flex justify-center h-[100vh] max-[768px]:h-[100%]">
        <div className="flex-wrap w-[65%] max-[768px]:w-[70%] mt-[1%] h-[90%] bg-white rounded-lg border-none border-Borde_gris flex items-center absolute justify-center">
          <div className="flex flex-wrap justify-center w-[90%]">
            {children}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Layoutcontenido5;
