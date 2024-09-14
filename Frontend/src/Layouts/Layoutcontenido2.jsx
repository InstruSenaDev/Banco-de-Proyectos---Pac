import React from 'react';

const Layoutcontenido2 = ({ title, text1, children }) => {
  return (
    <main className="pt-12 pb-20 pl-56 pr-44 2xl:pl-96 2xl:pr-96 2xl:pb-48">
      <div className="w-full flex justify-center">
        <h1 className="text-3xl font-bold font-josefin-slab text-center m-8">{text1}</h1>
      </div>
      <div className="w-full min-h-screen p-9 m-0 rounded-lg bg-white">
        {children}
      </div>
    </main>
  );
};

export default Layoutcontenido2;

// import React from 'react';

// const Layoutcontenido = ({ title, children }) => {
//   return (
//     <main className="flex justify-center items-center min-h-screen min-w-full 2xl:p-10 pl-9 p-10">
//       <div className="xl:w-2/3 h-auto p-8 rounded-lg border-none bg-white">
//         {children}
//       </div>
//     </main>
//   );
// };

// export default Layoutcontenido;
