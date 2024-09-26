import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import LayoutPrincipal from '../../layouts/LayoutPrincipal';
import Layoutcontenido from '../../Layouts/Layoutcontenido4';
import GridList from './GridList/GridListU';
import Loader from '../../Components/Loader';
import BotonSegundoModal from '../../Components/BotonSegundoModal';
import ModalUsuario from '../../Components/Modales/ModalUsuario';
import { ArrowLeftIcon } from '@heroicons/react/24/outline';

export default function Usuarios() {
  // Estados para manejar la carga, el modal y el usuario actual
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [actionType, setActionType] = useState('');

  const navigate = useNavigate();

  // Efecto para simular una carga de 2 segundos
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
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

  // Manejador para agregar un nuevo usuario
  const handleAddMember = (user) => {
    // Lógica para agregar un usuario
    console.log('Agregar', user);
  };

  // Manejador para volver al dashboard
  const handleGoBack = () => {
    navigate('/SuperAdmin/dashboard');
  };

  return (
    <LayoutPrincipal title="Usuarios">
      {loading ? (
        <div id="loader" className="flex items-center justify-center min-h-screen">
          <Loader />
        </div>
      ) : (
        <Layoutcontenido title="Usuarios">
          <div className="flex flex-col w-full p-4 sm:p-6 md:p-8 lg:p-10 mb-10">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 space-y-4 sm:space-y-0">
              <button
                onClick={handleGoBack}
                className="flex items-center text-black hover:text-Verde transition-colors duration-200"
              >
                <ArrowLeftIcon className="w-5 h-5 mr-2" />
                <span className="text-sm sm:text-base">Volver</span>
              </button>
              <BotonSegundoModal 
                text="Agregar Usuario" 
                id="addUserBtn" 
                onClick={handleAddClick}
                className="w-full sm:w-auto"
              />
            </div>
            <div className="mt-4">
              <GridList />
            </div>
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