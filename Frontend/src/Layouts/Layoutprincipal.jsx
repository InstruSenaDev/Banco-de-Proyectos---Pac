import React from 'react';
import Navbar from '../Components/Navbar';
import Menu from '../Components/Menu';
import PostLayout from './PostLayout';

// Componente principal
const Layoutprincipal = ({ title, children }) => {
  return (
    <PostLayout title={title}>
      <div>
        <header className="w-full h-full bg-white">
          <Navbar text="usuario" />
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