import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; 
import LayoutPrincipal from '../../layouts/LayoutPrincipal';
import Layoutcontenido from '../../Layouts/Layoutcontenido4';
import GridList from './GridList/GridListU';
import Loader from '../../Components/Loader';
import BotonSegundoModal from '../../Components/BotonSegundoModal';
import ModalUsuario from '../../Components/Modales/ModalUsuario';
import { ArrowLeftIcon } from '@heroicons/react/24/outline';
import axios from 'axios';

const Usuarios = () => {
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [users, setUsers] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const [actionType, setActionType] = useState('');

  const navigate = useNavigate();

  useEffect(() => {
    // Cargar usuarios al iniciar
    const fetchUsers = async () => {
      try {
        const response = await axios.get('http://localhost:4000/api/addUser'); // Endpoint para obtener usuarios
        setUsers(response.data);
      } catch (error) {
        console.error('Error al obtener usuarios:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const handleAddClick = () => {
    setCurrentUser(null);
    setActionType('add');
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setCurrentUser(null);
  };

  const handleAddMember = async (user) => {
    try {
      const response = await axios.post('/api/addUser', user);
      setUsers(prevUsers => [...prevUsers, response.data]); // Actualizar la lista de usuarios
    } catch (error) {
      console.error('Error al agregar usuario:', error);
    }
  };

  const handleGoBack = () => {
    navigate('/SuperAdmin/dashboard'); // Redirigir al dashboard
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
              <p className="mt-4 text-lg leading-6 text-gray-600 text-left">
                <button
                  onClick={handleGoBack}
                  className="flex items-center text-black hover:text-Verde"
                >
                  <ArrowLeftIcon className="w-5 h-5 mr-2" />
                  Volver
                </button>
              </p>
              <BotonSegundoModal text="Agregar Usuario" id="addUserBtn" onClick={handleAddClick} />
            </div>
            <div>
              <GridList users={users} /> {/* Pasa la lista de usuarios al componente GridList */}
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
};

export default Usuarios;
