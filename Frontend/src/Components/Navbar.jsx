import React from 'react';
import { useUser } from '../Context/UserContext';

const Navbar = ({ text, toggleMenu }) => {
  const { user } = useUser();

  if (user === null) {
    return <div>Loading...</div>;
  }

  return (
    <nav className="bg-Color_carta flex p-4 justify-between z-40">
      <div className="flex items-center z-20">
        <button onClick={toggleMenu} className="text-black mr-4">
          <i className="fas fa-bars text-2xl"></i>
        </button>
      </div>
      <div className="flex items-center">
        <img
          src="/Img/perfil.png"
          alt="User Avatar"
          className="rounded-full w-12 h-12 mr-2"
        />
        <span className="text-black">
          {user.nombre || 'Invitado'}
          <br />
          {text}
        </span>
      </div>
    </nav>
  );
};

export default Navbar;