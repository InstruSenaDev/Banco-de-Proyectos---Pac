
import React from 'react';
import Navbar from '../Components/Navbar';
import Menu from '../Components/Menu';
import PostLayout2 from '../Layouts/PostLayout2';

const LayoutHome = ({ title, children }) => {
  const userName = localStorage.getItem('userName') || 'Invitado';
  return (
    <PostLayout2 title={title}>
      <div>
        <header className="w-full bg-white">
        <Navbar userName={userName} /> {/* Incluye el Navbar y pasa el nombre del usuario como prop */}
        </header>
        <aside>
          <Menu />
        </aside>
        {children}
      </div>
    </PostLayout2>
  );
};

export default LayoutHome;
