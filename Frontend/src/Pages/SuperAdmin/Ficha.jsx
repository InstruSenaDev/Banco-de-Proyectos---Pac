import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import LayoutPrincipal from '../../layouts/LayoutPrincipal1';
import Layoutcontenido from '../../Layouts/Layoutcontenido4';
import GridListFicha from './GridList/GridListFicha';
import Loader from '../../Components/Loader';
import BotonSegundoModal from '../../Components/BotonSegundoModal';
import ModalFicha from '../../Components/Modales/ModalFichas';
import Modal from '../../Components/Modal'; // Importa tu nuevo modal de confirmación
import { ArrowLeftIcon } from '@heroicons/react/24/outline';

const Fichas = () => {
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isConfirmationOpen, setIsConfirmationOpen] = useState(false); // Estado para el modal de confirmación
  const [currentFicha, setCurrentFicha] = useState(null);
  const [fichas, setFichas] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const navigate = useNavigate();

  const fetchFichas = async () => {
    setLoading(true);
    try {
      const response = await fetch('http://localhost:4000/api/fichas');
      if (!response.ok) {
        throw new Error('Error al cargar las fichas');
      }
      const data = await response.json();
      setFichas(data);
    } catch (error) {
      console.error('Error al cargar fichas:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFichas();
  }, []);

  const handleAddClick = () => {
    setCurrentFicha(null);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setCurrentFicha(null);
  };

  // Manejador para agregar una nueva ficha
  const handleAddFicha = async (newFicha) => {
    if (isSubmitting) return;
    setIsSubmitting(true);
    setLoading(true);

    try {
      const response = await fetch('http://localhost:4000/api/fichas', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newFicha)
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`Error al registrar la ficha: ${errorData.message || response.statusText}`);
      }

      await fetchFichas(); // Recarga la lista de fichas
      setIsConfirmationOpen(true); // Abre el modal de confirmación
      handleCloseModal(); // Cierra el modal de agregar ficha
    } catch (error) {
      console.error('Error detallado al agregar ficha:', error);
    } finally {
      setIsSubmitting(false);
      setLoading(false);
    }
  };

  const handleGoBack = () => {
    navigate('/SuperAdmin/dashboard');
  };

  return (
    <LayoutPrincipal title="Fichas">
      {loading ? (
        <div id="loader" className="flex items-center justify-center min-h-screen">
          <Loader />
        </div>
      ) : (
        <Layoutcontenido title="Fichas">
          <div className="flex flex-col w-full p-4 md:p-10 mb-10">
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
              <GridListFicha fichas={fichas} setFichas={setFichas} />
            </div>
            {isModalOpen && (
              <ModalFicha
                onClose={handleCloseModal}
                onAddFicha={handleAddFicha}
                ficha={currentFicha}
                isSubmitting={isSubmitting}
              />
            )}
            {/* Modal de confirmación */}
            <Modal
              Text="Ficha registrada exitosamente."
              isOpen={isConfirmationOpen} // Usa el estado del modal de confirmación
              onClose={() => setIsConfirmationOpen(false)} // Cierra el modal
            />
          </div>
        </Layoutcontenido>
      )}
    </LayoutPrincipal>
  );
};

export default Fichas;
