import React from 'react';

import Navbar from '../Components/Navbar';
import Menu from '../Components/Menu';
import PostLayout from './PostLayout';

// Componente principal
const Layoutprincipal = ({ title, children }) => {
  const userName = localStorage.getItem('userName') || 'Invitado';

  return (
    <PostLayout title={title}>
      <div>
        <header className="w-full h-full bg-white sticky top-0 z-10">
        <Navbar userName={userName} /> {/* Incluye el Navbar y pasa el nombre del usuario como prop */}
        </header>

        <aside className='w-full'>
          <Menu />
        </aside>

        {children}
      </div>
    </PostLayout>
  );
};

export default Layoutprincipal;
