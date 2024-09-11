import React from 'react';
import Navbar from '../Components/Navbar';
import Menu from '../Components/Menu';
import PostLayout from './PostLayout';

// Componente principal
const Layoutprincipal = ({ title, children }) => {
  return (
    <PostLayout title={title}>
      <div className='p-0 m-0 w-full'>
        <header className="w-full h-full bg-white sticky top-0 z-10 p-0 m-0">
          <Navbar text="usuario p-0 m-0" />
        </header>

        <aside className='w-full p-0 m-0'>
          <Menu />
        </aside> 

          {children}

      </div>
    </PostLayout>
  );
};

export default Layoutprincipal;