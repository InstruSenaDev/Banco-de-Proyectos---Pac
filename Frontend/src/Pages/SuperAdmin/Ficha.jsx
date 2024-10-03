import { useState, useEffect } from 'react';
import LayoutPrincipal from '../../layouts/LayoutPrincipal1';
import Layoutcontenido from '../../Layouts/Layoutcontenido4';
import GridListFicha from './GridList/GridListFicha';
import Loader from '../../Components/Loader';
import BotonSegundoModal from '../../Components/BotonSegundoModal';
import ModalFicha from '../../Components/Modales/ModalFichas';
import { ArrowLeftIcon } from '@heroicons/react/24/outline';

const Fichas = () => {
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [fichas, setFichas] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
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

    fetchFichas();
  }, []);

  const handleAddClick = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSuccessMessage('');
  };

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
        body: JSON.stringify(newFicha),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`Error al registrar la ficha: ${errorData.message || response.statusText}`);
      }

      setSuccessMessage('Registro exitoso');
      handleCloseModal(); // Cerrar modal al éxito
      const updatedResponse = await fetch('http://localhost:4000/api/fichas');
      const updatedData = await updatedResponse.json();
      setFichas(updatedData);
    } catch (error) {
      console.error('Error detallado al agregar ficha:', error);
    } finally {
      setIsSubmitting(false);
      setLoading(false);
    }
  };

  return (
    <LayoutPrincipal title="Fichas">
      {loading ? (
        <Loader />
      ) : (
        <Layoutcontenido title="Fichas">
          <div className="flex flex-col w-full p-10 mb-10">
            <div className="flex justify-between items-center mb-4">
              <button className="flex items-center text-black hover:text-Verde" onClick={() => navigate('/SuperAdmin/dashboard')}>
                <ArrowLeftIcon className="w-5 h-5 mr-2" />
                Volver
              </button>
              <BotonSegundoModal text="Agregar Ficha" onClick={handleAddClick} />
            </div>

            {successMessage && (
              <div className="mb-4 text-green-500">
                {successMessage}
              </div>
            )}

            <GridListFicha fichas={fichas} setFichas={setFichas} />
            
            {isModalOpen && (
              <ModalFicha 
              onClose={handleCloseModal} 
              onAddFicha={handleAddFicha}
              isSubmitting={isSubmitting} />
            )}
          </div>
        </Layoutcontenido>
      )}
    </LayoutPrincipal>
  );
};

export default Fichas;
