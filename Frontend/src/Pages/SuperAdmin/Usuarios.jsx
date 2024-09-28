import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import LayoutPrincipal from '../../layouts/LayoutPrincipal1';
import Layoutcontenido from '../../Layouts/Layoutcontenido4';
import GridList from './GridList/GridListU';
import Loader from '../../Components/Loader';
import BotonSegundoModal from '../../Components/BotonSegundoModal1';
import ModalUsuario from '../../Components/Modales/ModalUsuario';
import { ArrowLeftIcon } from '@heroicons/react/24/outline';

export default function Usuarios() {
  // Estados para manejar la carga, el modal, el usuario actual, el tipo de acción y el conteo de usuarios
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [actionType, setActionType] = useState('');
  const [, setUserCount] = useState(0);

  const navigate = useNavigate();

  // Función para obtener la lista de usuarios desde la API
  const fetchUsers = async () => {
    setLoading(true);
    try {
      const response = await fetch('http://localhost:4000/api/personas');
      const users = await response.json();
      setUserCount(users.length); // Actualiza el número total de usuarios
    } catch (error) {
      console.error('Error al obtener usuarios:', error);
    } finally {
      setLoading(false);
    }
  };

  // Efecto para cargar los usuarios al montar el componente
  useEffect(() => {
    fetchUsers();
  }, []);

  // Manejador para abrir el modal de agregar usuario
  const handleAddClick = () => {
    setCurrentUser(null);
    setActionType('add');
    setIsModalOpen(true);
  };

  // Manejador para cerrar el modal
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setCurrentUser(null);
  };

  // Función para agregar un nuevo usuario
  const handleAddMember = async (user) => {
    try {
      const response = await fetch('http://localhost:4000/api/personas', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(user),
      });

      if (response.ok) {
        await fetchUsers(); // Recarga la lista de usuarios
        handleCloseModal(); // Cierra el modal
      } else {
        console.error('Error al agregar el usuario');
      }
    } catch (error) {
      console.error('Error al agregar el usuario:', error);
    }
  };

  // Manejador para volver a la página del dashboard
  const handleGoBack = () => {
    navigate('/SuperAdmin/dashboard');
  };

  return (
    <LayoutPrincipal title="Usuarios">
      {loading ? (
        // Muestra el loader mientras se cargan los datos
        <div id="loader" className="flex items-center justify-center min-h-screen">
          <Loader />
        </div>
      ) : (
        // Muestra el contenido principal una vez cargados los datos
        <Layoutcontenido title="Usuarios">
          <div className="flex flex-col w-full p-4 sm:p-6 md:p-8 lg:p-10 mb-10">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 space-y-4 sm:space-y-0">
              {/* Botón para volver al dashboard */}
              <button
                onClick={handleGoBack}
                className="flex items-center text-black hover:text-Verde transition-colors duration-200"
              >
                <ArrowLeftIcon className="w-5 h-5 mr-2" />
                <span className="text-sm sm:text-base">Volver</span>
              </button>
              {/* Botón para agregar un nuevo usuario */}
              <BotonSegundoModal
                text="Agregar Usuario"
                id="addUserBtn"
                onClick={handleAddClick}
                className="w-full sm:w-auto"
              />
            </div>
            {/* Lista de usuarios */}
            <div className="mt-4">
              <GridList setUserCount={setUserCount} fetchUsers={fetchUsers} />
            </div>
            {/* Modal para agregar/editar usuario */}
            {isModalOpen && (
              <ModalUsuario
                onClose={handleCloseModal}
                onAddMember={handleAddMember}
                user={currentUser}
                actionType={actionType}
              />
            )}
          </div>
        </Layoutcontenido>
      )}
    </LayoutPrincipal>
  );
}