import React from 'react';

const Layoutformulario = ({ title, children }) => {
  return (
    <>
      <head>
        <meta charSet="UTF-8" />
        <meta name="description" content="Astro description" />
        <meta name="viewport" content="width=device-width" />
        <script src="https://kit.fontawesome.com/763c79dbc1.js" crossOrigin="anonymous"></script>
        <title>{title}</title>
        <style>
          {`@import url('https://fonts.googleapis.com/css2?family=Josefin+Slab:ital,wght@0,100..700;1,100..700&display=swap');`}
          {`
            body {
              font-family: 'Josefin Slab', serif;
            }
          `}
        </style>
      </head>
      <body className="bg-white xl:m-0 xl:overflow-y-hidden xl:p-0 xl:h-full sm:h-screen p-20 sm:p-14 h-screen flex justify-center sm:w-auto m-0">
        {children}
      </body>
    </>
  );
};

export default Layoutformulario;
