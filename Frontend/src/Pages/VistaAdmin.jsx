import React, { useEffect, useState } from 'react';
import LayoutHome from '../Layouts/LayoutHome';
import CartaUsuario from '../Components/CartaUsuario';
import Loader from '../Components/Loader';
import BotonPrincipal from '../Components/BotonPrincipal';
import BotonSegundo from '../Components/BotonSegundo';

const VistaAdmin = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simula un tiempo de carga de 2 segundos
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  // Si está cargando, muestra solo el Loader
  if (loading) {
    return <Loader />;
  }

  // Si no está cargando, renderiza el contenido dentro del layout
  return (
    <LayoutHome title="">
      <div id="content" className="">
        <div className="flex flex-col items-center justify-center min-h-screen overflow-hidden">
          <div className="w-full max-w-7xl flex-grow px-4 sm:px-8 md:px-0">
            <div className="flex flex-col md:flex-row items-start lg:px-10 2xl:px-0 gap-x-36">
              <div className="w-full md:w-1/2 p-4 md:p-8 lg:">
                <span className="text-4xl sm:text-6xl md:text-7xl font-josefin-slab mb-4 block lg:ps-12 2xl:text-9xl 2xl:ps-0">Bienvenido</span>
                <span className="text-3xl sm:text-5xl md:text-5xl text-verde font-inter mb-4 block lg:ps-12 2xl:text-9xl 2xl:ps-0">Instructor</span>
                <p className="text-base sm:text-lg md:text-3xl lg:text-2xl font-josefin-slab mb-8 mt-4 md:mt-20 lg:ps-12 2xl:text-4xl 2xl:ps-0">
                  ¡Hola! querido Instructor, aquí podrás ver los proyectos registradros por parte de las empresas o usuarios. ¡Ten una buena experiencia en el aplicativo!
                </p>
              </div>
              <div className="w-full md:w-1/2 flex justify-center items-center p-4 md:p-8 lg:w-2/3 ">
                <img className="w-full max-w-md h-auto 2xl:w-[1000px] 2xl:h-[600px]" src="/Img/usuario.png" alt="Imagen Principal" />
              </div>
            </div>
            <div className="flex justify-start gap-x-7  mt-8 mx-7 sm:mt-0 lg:ps-12">
              
                {/* <a href="/">
                  <BotonPrincipal Text="Atras" />
                </a> */}
                <a href="/calificar">
                  <BotonSegundo Text="Empezar" />
                </a>
              
            </div>
          </div>
        </div>
      </div>
    </LayoutHome>
  );
};

export default VistaAdmin;