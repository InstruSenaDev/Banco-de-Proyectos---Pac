import React from 'react';

const LayoutFormulario = ({ title, children }) => {
  return (
      <body className="bg-white xl:m-0 xl:overflow-y-hidden xl:p-0 xl:h-full sm:h-screen p-20 sm:p-14 h-screen flex justify-center sm:w-auto m-0">
        {children}
      </body>
  );
};

export default LayoutFormulario;
