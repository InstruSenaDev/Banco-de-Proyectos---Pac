import React from "react";
import BotonPrincipal from "../../Components/BotonPrincipal";
import BotonSegundo from "../../Components/BotonSegundo";

const Home = () => {
  return (
    <div className="p-4 md:p-10 bg-white flex flex-col lg:flex-row justify-center items-center min-h-screen">
      <div className="w-full lg:w-1/2 p-4 lg:p-10">
        <div className="flex space-x-4 mb-8 lg:mb-20">
          <img
            className="w-16 h-16 md:w-20 md:h-20"
            src="/Img/Logo.png"
            alt="Logo"
          />
        </div>
        <h1 className="text-4xl md:text-6xl lg:text-9xl font-josefin-slab mb-2">
          Banco de proyectos
        </h1>
        <h2 className="text-3xl md:text-5xl lg:text-8xl text-Verde font-Inter mb-8 lg:mb-50">
          ADSO
        </h2>
        <p className="text-lg md:text-xl lg:text-2xl font-josefin-sans mb-8 lg:mb-10 lg:w-30">
          ¿Tienes una idea que quema en tu mente? ¡Es hora de compartirla! Únete
          a nuestro banco de proyectos y convierte tu visión en realidad. ¿Estás
          listo para dar el primer paso hacia el éxito?
        </p>
        <div className="flex flex-col justify-center sm:justify-start sm:flex-row sm:gap-x-6 ">
          <div className="w-auto flex justify-center">
            <a href="/Principal/Inicio">
              <BotonPrincipal Text="Iniciar Sesion" />
            </a>
          </div>
          <div className="w-auto flex justify-center">
            <a href="/Principal/Registro1">
              <BotonSegundo Text="Registrate" />
            </a>
          </div>
        </div>
      </div>
      <div className="w-full lg:w-1/2 flex justify-center items-center mt-8 lg:mt-0">
        <img
          className="w-full max-w-2xl lg:scale-100"
          src="/Img/Principal.png"
          alt="Principal Image"
        />
      </div>
    </div>
  );
};

export default Home;
