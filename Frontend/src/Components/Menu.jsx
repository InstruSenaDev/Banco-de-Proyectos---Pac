import React, { useState } from 'react';
import Items1 from '../Components/Items1';
import '../css/Sidebar.css';

const Menu = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleMouseEnter = () => {
    setIsOpen(true);
  };

  const handleMouseLeave = () => {
    setIsOpen(false);
  };

  return (
    <div>
      <aside
        id="sidebar"
        className={`sidebar fixed top-0 left-0 z-40 h-full bg-gray-50 transition-all duration-300 transform ${
          isOpen ? 'w-64' : 'w-16'
        }`}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <div className="h-full px-3 py-4 overflow-y-auto bg-[#2eb694]">
          <div className="flex items-center">
          <img src="/img/Logo-DfgaWop5.png" alt="Logo" className="w-10 h-10 pb-2" />
            {isOpen && (
              <span className="text-xl font-semibold whitespace-nowrap dark:text-black text-white ml-2 pl-2">
                PAC
              </span>
            )}
          </div>
          <ul className="space-y-3 font-medium mt-5 text-white">
            <Items1 icon="fas fa-home" href="#" label={isOpen ? 'Proyecto' : ''} />
            <Items1 icon="fa-solid fa-user" href="/SuperAdmin/dashboard" label={isOpen ? 'Dashboard' : ''} />
            <Items1 icon="fas fa-sign-out-alt" href="#" label={isOpen ? 'Salir' : ''} />
          </ul>
        </div>
      </aside>
    </div>
  );
};

export default Menu;