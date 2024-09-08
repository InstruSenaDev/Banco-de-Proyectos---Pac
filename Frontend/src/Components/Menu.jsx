import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faUser, faCog, faProjectDiagram, faTools, faUsers, faBook } from '@fortawesome/free-solid-svg-icons';
import Items1 from '../Components/Items1'; // Asegúrate de que la ruta sea correcta

const Sidebar = () => {
  const [userRole, setUserRole] = useState(null);
  const [menuItems, setMenuItems] = useState([]);

  useEffect(() => {
    const role = localStorage.getItem('userRole');
    if (role) {
      setUserRole(role);
      const items = menuItemsByRole[role] || [];
      setMenuItems(items);
    }
  }, []);

  const menuItemsByRole = {
    1: [
      { icon: faHome, href: '/VistaProyectos', label: 'Proyectos' },
      { icon: faUser, href: '/VistaAprobados', label: 'Vista Aprobados' },
      { icon: faCog, href: '/AsignarProyecto', label: 'Asignar Proyecto' }
    ],
    2: [
      { icon: faHome, href: '/VistaMisProyectos', label: 'Vista Mis Proyectos' },
      { icon: faProjectDiagram, href: '/EditarPerfil', label: 'Editar Perfil' }
    ],
    3: [
      { icon: faHome, href: '/CrearFichas', label: 'Crear Usuario' },
      { icon: faUsers, href: '/CrearUsuario', label: 'Crear Fichas' },
      { icon: faTools, href: '/EditarRegistro', label: 'Editar Registro' },
      { icon: faTools, href: '/CargaMasiva', label: 'Cargar Aprendices' }
    ],
    4: [
      { icon: faHome, href: '/ProyectosAsignados', label: 'Proyectos Asignados' },
      { icon: faBook, href: '/EditarPerfil', label: 'Editar Perfil' }
    ]
  };

  return (
    <div>
      <style>
        {`
          body {
            font-family: "Josefin Slab", serif;
            font-optical-sizing: auto;
          }

          .sidebar {
            width: 60px; /* Ancho inicial */
            transition: width 0.3s ease, transform 0.3s ease;
          }

          .sidebar.open {
            width: 200px; /* Ancho expandido al abrir */
          }

          .sidebar ul span {
            display: none; /* Oculta los nombres de los proyectos inicialmente */
          }

          .sidebar.open ul span {
            display: inline-block; /* Muestra los nombres de los proyectos al abrir */
          }

          .sidebar:hover {
            width: 200px; /* Ancho expandido al pasar el cursor */
          }
        `}
      </style>

      <button id="menu-button" className="md:hidden p-4 fixed top-0 left-0 z-50">
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path>
        </svg>
      </button>

      <aside className="sidebar fixed top-0 left-0 z-40 h-full bg-gray-50 transition-transform transform -translate-x-full md:translate-x-0">
        <div className="h-full px-3 py-4 overflow-y-auto bg-[#A3E784]">
          <a href="#" className="flex items-center ps-2.5 mb-5">
            <img src="../public/Img/logo.svg" alt="Logo" className="w-10 h-10 pb-2" />
            <span className="text-xl font-semibold whitespace-nowrap dark:text-black ml-2 pl-2">PAC</span>
          </a>
          <Items1 menuItems={menuItems} />
        </div>
      </aside>
    </div>
  );
};

export default Sidebar;
