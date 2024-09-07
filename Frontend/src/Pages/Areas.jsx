import { useState, useEffect } from 'react';
import LayoutPrincipal from '../Layouts/LayoutPrincipal';
import Layoutcontenido from '../Layouts/Layoutcontenido4';
import GridList from './GridListU';
import Loader from '../Components/Loader';
import BotonSegundoModal from '../Components/BotonSegundoModal';
import Areas from '../Components/Areas';

const Area = () => {
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [actionType, setActionType] = useState('');

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  const handleAddClick = () => {
    setCurrentUser(null);
    setActionType('add');
    setIsModalOpen(true);
  };

  const handleEditClick = (user) => {
    setCurrentUser(user);
    setActionType('edit');
    setIsModalOpen(true);
  };

  const handleDeleteClick = (user) => {
    setCurrentUser(user);
    setActionType('delete');
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
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

  return (
    <LayoutPrincipal title="Usuarios">
      {loading ? (
        <div id="loader" className="flex items-center justify-center min-h-screen">
          <Loader />
        </div>
      ) : (
        <Layoutcontenido title="Usuarios">
        <div className="flex flex-col w-full p-10 mb-10">
            <div className="flex justify-between items-center mb-4">
              <p className="mt-4 text-sm leading-6 text-gray-600 text-left">
              </p>
              <BotonSegundoModal text="Agregar Usuario" id="addUserBtn" onClick={handleAddClick}/>
            </div>
            <div className="bg-white shadow-md rounded-lg overflow-hidden">
              <GridList onEdit={handleEditClick} onDelete={handleDeleteClick} />
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
