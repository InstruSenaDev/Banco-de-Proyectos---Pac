import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import LayoutPrincipal from '../../layouts/LayoutPrincipal';
import Layoutcontenido from '../../Layouts/Layoutcontenido4';
import GridListArea from './GridList/GridListArea';
import Loader from '../../Components/Loader';
import BotonSegundo from '../../Components/BotonSegundo';
import Areas from '../../Components/Modales/ModalAreas';
import { ArrowLeftIcon } from '@heroicons/react/24/outline';

const Area = () => {
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false); // Estado del modal
  const [areas, setAreas] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    fetchAreas();
  }, []);

  const fetchAreas = async () => {
    try {
      const response = await fetch('http://localhost:4000/api/areas');
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setAreas(data);
    } catch (error) {
      console.error("Error fetching areas:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddClick = () => {
    setIsModalOpen(true);  // Abrir modal al hacer clic
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);  // Cerrar modal
  };

  const handleAddArea = (newArea) => {
    setAreas([...areas, newArea]);  // Actualizar lista de áreas con la nueva área
    fetchAreas();  // Refrescar datos
  };

  const handleGoBack = () => {
    navigate('/dashboard');
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
              <BotonSegundo text="Agregar Area" to="/crearareas" />
            </div>
            <div>
              <GridListArea areas={areas} />
            </div>
            {isModalOpen && (
              <Areas
                onClose={handleCloseModal}  // Cerrar modal
                onAddMember={handleAddArea}  // Agregar nueva área a la lista
              />
            )}
          </div>
        </Layoutcontenido>
      )}
    </LayoutPrincipal>
  );
};

export default Area;
