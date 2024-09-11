import React from 'react';

const PosLayout = ({ title, children }) => {
  return (
    // <html lang="es">
    //   <head>
    //     <meta charSet="UTF-8" />
    //     <meta name="description" content="React description" />
    //     <meta name="viewport" content="width=device-width" />
    //     <link rel="icon" type="image/svg+xml" href="../../public/img/IconBoteritos.png" />
    //     <script
    //       src="https://kit.fontawesome.com/763c79dbc1.js"
    //       crossOrigin="anonymous"
    //     ></script>
    //     <title>{title}</title>
    //     <style>
    //       @import url('https://fonts.googleapis.com/css2?family=Josefin+Slab:ital,wght@0,100..700;1,100..700&display=swap');
    //       {`body {
    //           font-family: 'Josefin Slab', serif;
    //       }`}
    //     </style>
    //   </head>
    //   <body className="bg-[#F5F6FA] m-0 p-0 ">
    //     {children}
    //   </body>
    // </html>

    <div className='bg-[#F5F6FA] m-0 p-0 w-full'>
      {children}

    </div>
  );
};

export default PosLayout;
