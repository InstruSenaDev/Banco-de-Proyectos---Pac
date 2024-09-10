import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; 
import LayoutPrincipal from '../../layouts/LayoutPrincipal';
import Layoutcontenido from '../../Layouts/Layoutcontenido4';
import GridListFicha from './GridList/GridListFicha';
import Loader from '../../Components/Loader';
import BotonSegundoModal from '../../Components/BotonSegundoModal';
import ModalFicha from '../../Components/Modales/ModalFichas'; 
import { ArrowLeftIcon } from '@heroicons/react/24/outline';

const Fichas = () => {
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [, setCurrentUser] = useState(null); // Correcto
  const [, setActionType] = useState(''); // Correcto

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

  const handleCloseModal = () => {
    setIsModalOpen(false); // Cerrar el modal
    setCurrentUser(null);
  };

  const handleGoBack = () => {
    navigate('/dashboard'); // Redirigir al dashboard
  };

  return (
    <LayoutPrincipal title="Fichas">
      {loading ? (
        <div id="loader" className="flex items-center justify-center min-h-screen">
          <Loader />
        </div>
      ) : (
        <Layoutcontenido title="Fichas">
          <div className="flex flex-col w-full p-10 mb-10">
            <div className="flex justify-between items-center mb-4">
              <button
                onClick={handleGoBack}
                className="flex items-center text-black hover:text-Verde"
              >
                <ArrowLeftIcon className="w-5 h-5 mr-2" />
                Volver
              </button>
              <BotonSegundoModal text="Agregar Ficha" id="addFichaBtn" onClick={handleAddClick} />
            </div>
            <div>
              <GridListFicha />
            </div>
            {isModalOpen && (
              <ModalFicha // Utiliza el modal correctamente
                onClose={handleCloseModal} // Para cerrar el modal
              />
            )}
          </div>
        </Layoutcontenido>
      )}
    </LayoutPrincipal>
  );
};

export default Fichas;
