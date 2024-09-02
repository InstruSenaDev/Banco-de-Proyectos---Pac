import React from 'react';
import Navbar from '../Frontend/src/Components/Navbar';
import Menu from '../Frontend/src/Components/Menu';
import PostLayout from './PostLayout';

const LayoutPrincipal = ({ title, children }) => {
  return (
    <PostLayout title="Banco de proyectos">
      <div>
        <header className="w-full bg-white">
          <Navbar Text="djcds" />
        </header>
        <aside>
          <Menu />
        </aside>
        {children}
      </div>
    </PostLayout>
  );
};

export default LayoutPrincipal;