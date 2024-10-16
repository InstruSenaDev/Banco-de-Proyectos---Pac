import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../../public/Img/Logo.png';
import '../css/Sidebar.css';

const Menu = ({ isOpen, toggleMenu }) => {
  const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth < 768);
  const [userRole, setUserRole] = useState(null);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const user = localStorage.getItem('user');
    if (user) {
      try {
        const parsedUser = JSON.parse(user);
        if (parsedUser && parsedUser.rol) {
          setUserRole(parsedUser.rol);
        } else {
          setError('Invalid user data in localStorage');
        }
      } catch (e) {
        setError('Error parsing user data from localStorage');
      }
    } else {
      setError('No user data found in localStorage');
    }
  }, []);

  const menuItems = {
    1: [
      { icon: 'fas fa-home', to: '/VistaAdmin', label: 'Home' },
      { icon: 'fas fa-folder-open', to: '/calificar', label: 'Proyectos' },
      { icon: 'fa-solid  fa-users', to: '/Asignados', label: 'Proyectos Asignados' },
    ],
    4: [
      { icon: 'fas fa-home', to: '/Aprendiz/VistaAprendiz', label: 'Home' },
      { icon: 'fa-solid  fa-users', to: '/Aprendiz/VistaProyectos', label: 'Proyectos Asignados' },
      { icon: 'fas fa-user-edit', to: '/Aprendiz/EditarPerfil', label: 'Editar Perfil' },
    ],
    3: [
      { icon: 'fas fa-user-plus', to: '/SuperAdmin/usuarios', label: 'Crear Usuario' },
      { icon: 'fas fa-folder-open', to: '/SuperAdmin/registrocompleto', label: 'Registro completo' },
      { icon: 'fas fa-upload', to: '/SuperAdmin/proyectos', label: 'Ver proyectos' },
    ],
    2: [
      { icon: 'fas fa-home', to: '/Usuario/VistaUsuario', label: 'Home' },
      { icon: 'fa-solid fa-folder-plus', to: '/Usuario/VistaMisProyectos', label: 'Mis Proyectos' },
      { icon: 'fas fa-project-diagram', to: '/Aprendiz/EditarPerfil', label: 'Editar Perfil' },
    ],
  };

  const roleMenuItems = userRole && menuItems[userRole] ? menuItems[userRole] : [];

  const handleLogout = () => {
    localStorage.clear();
    navigate('/');
  };

  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth < 768);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  if (error) {
    return <div>Error: {error}. Please <Link to="/">login again</Link>.</div>;
  }

  return (
    <>
      <aside
        id="menu"
        className={`fixed top-0 left-0 z-40 h-full bg-gray-50 transition-all duration-300 transform ${
          isSmallScreen
            ? isOpen
              ? 'translate-x-0 w-64'
              : '-translate-x-full w-64'
            : 'w-64 translate-x-0'
        }`}
      >
        <div className="h-full px-3 py-4 overflow-y-auto bg-verde">
          <div className="flex items-center space-x-3">
            <img src={logo} alt="Logo" className="w-10 h-10" />
            <span className="text-xl font-semibold whitespace-nowrap text-white">
              PAC
            </span>
          </div>
          <ul className="space-y-3 font-medium mt-5">
            {roleMenuItems.map((item, index) => (
              <li key={index} className="w-full">
                <Link
                  to={item.to}
                  className="flex items-center p-2 text-black rounded-lg dark:text-black group w-full hover:bg-gray-200"
                  onClick={() => isSmallScreen && toggleMenu()}
                >
                  <i className={`${item.icon} static-icon text-white`} aria-hidden="true"></i>
                  <span className="ml-3 whitespace-nowrap text-white">
                    {item.label}
                  </span>
                </Link>
              </li>
            ))}
            <li className="w-full">
              <button
                onClick={handleLogout}
                className="flex items-center p-2 text-gray-900 rounded-lg dark:text-black group w-full hover:bg-gray-200"
              >
                <i className="fas fa-sign-out-alt static-icon text-white" aria-hidden="true"></i>
                <span className="ml-3 whitespace-nowrap text-white">
                  Salir
                </span>
              </button>
            </li>
          </ul>
        </div>
      </aside>

      {isOpen && isSmallScreen && (
        <div
          className="fixed inset-0 bg-black opacity-50 z-30"
          onClick={toggleMenu}
        ></div>
      )}
    </>
  );
};

export default Menu;