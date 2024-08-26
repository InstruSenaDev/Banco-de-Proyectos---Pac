import React, { useState } from 'react';
import Items1 from '../Components/Items1'

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleMenuButtonClick = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div>
      <button
        id="menu-button"
        className="md:hidden p-4 fixed top-0 left-0 z-50"
        onClick={handleMenuButtonClick}
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path>
        </svg>
      </button>

      <aside
        id="sidebar"
        className={`sidebar fixed top-0 left-0 z-40 h-full bg-gray-50 transition-transform transform ${isOpen ? 'translate-x-0' : '-translate-x-full'} ${isOpen ? 'open' : ''}`}
      >
        <div className="h-full px-3 py-4 overflow-y-auto bg-[#A3E784]">
          <a href="#" className="flex items-center ps-2.5 mb-5"></a>
          <ul className="space-y-3 font-medium">
            <div className="flex items-center">
              <img src="/img/logo.svg" alt="Logo" className="w-10 h-10 pb-2" />
              <span className="text-xl font-semibold whitespace-nowrap dark:text-black ml-2 pl-2">PAC</span>
            </div>
            <Items1 icon="fas fa-home" href="hover" label="Proyecto" />
            <Items1 icon="fa-solid fa-user" href="hover" label="Proyecto" />
            <Items1 icon="fas fa-home" href="hover" label="Proyecto" />
            <Items1 icon="fas fa-home" href="hover" label="Proyecto" />
            <Items1 icon="fas fa-home" href="hover" label="Proyecto" />
          </ul>
        </div>
      </aside>
    </div>
  );
};

export default Sidebar;
