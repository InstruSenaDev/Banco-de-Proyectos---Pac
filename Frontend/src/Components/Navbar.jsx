import React from 'react';
import Buscador from './Buscador'; // Asegúrate de ajustar la ruta según sea necesario

const Navbar = ({text}) => {

  return (
    <nav className="bg-white flex p-4 justify-between">
      <div className="flex items-start">
        <Buscador type="search" />
      </div>
      
      <div className="flex grid-cols-2 justify-center items-center mr-6 max-[768px]:hidden">
        <img 
          src="/img/perfil.png" 
          alt="User Avatar" 
          className="flex rounded-full w-12 h-12 mr-2 justify-end"
        />
        <span className="text-black">
          Karen Riascos <br />{text}
        </span>
      </div>
    </nav>
  );
};

export default Navbar;
