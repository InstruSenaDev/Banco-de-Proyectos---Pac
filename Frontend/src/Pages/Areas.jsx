import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; 
import LayoutPrincipal from '../Layouts/LayoutPrincipal';
import Layoutcontenido from '../Layouts/Layoutcontenido4';
import GridListArea from './GridListArea';
import Loader from '../Components/Loader';
import BotonSegundoModal from '../Components/BotonSegundoModal';
import Areas from '../Components/Areas';
import { ArrowLeftIcon } from '@heroicons/react/24/outline';

const Area = () => {
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [actionType, setActionType] = useState('');

  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  const handleAddClick = () => {
    setCurrentUser(null);
    setActionType('add');
    setIsModalOpen(true); // Abrir el modal
  };

  const handleEditClick = (user) => {
    setCurrentUser(user);
    setActionType('edit');
    setIsModalOpen(true); // Abrir el modal
  };

  const handleDeleteClick = (user) => {
    setCurrentUser(user);
    setActionType('delete');
    setIsModalOpen(true); // Abrir el modal
  };

  const handleCloseModal = () => {
    setIsModalOpen(false); // Cerrar el modal
    setCurrentUser(null);
  };

  const handleAddMember = (user) => {
    // Lógica para agregar un usuario
    console.log('Agregar usuario:', user);
  };

  const handleEditMember = (user) => {
    // Lógica para editar un usuario
    console.log('Editar usuario:', user);
  };

  const handleDeleteMember = (user) => {
    // Lógica para borrar un usuario
    console.log('Borrar usuario:', user);
  };

  const handleGoBack = () => {
    navigate('/dashboard'); // Redirigir al dashboard
  };

  

  return (
    <LayoutPrincipal title="Areas">
      {loading ? (
        <div id="loader" className="flex items-center justify-center min-h-screen">
          <Loader />
        </div>
      ) : (
        <Layoutcontenido title="Areas">
          <div className="flex flex-col w-full p-10 mb-10">
            <div className="flex justify-between items-center mb-4">
              <button
                onClick={handleGoBack}
                className="flex items-center text-black hover:text-Verde"
              >
                <ArrowLeftIcon className="w-5 h-5 mr-2" />
                Volver
              </button>
              <BotonSegundoModal text="Agregar Area" id="addUserBtn" onClick={handleAddClick} />
            </div>
            <div className="bg-white shadow-md rounded-lg overflow-hidden">
              <GridListArea onEdit={handleEditClick} onDelete={handleDeleteClick} />
            </div>
            {isModalOpen && (
              <Areas
                onClose={handleCloseModal}
                onAddMember={handleAddMember}
                onEditMember={handleEditMember}
                onDeleteMember={handleDeleteMember}
                user={currentUser}
                actionType={actionType}
              />
            )}
          </div>
        </Layoutcontenido>
      )}
    </LayoutPrincipal>
  );
};

export default Area;
