import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; 
import LayoutPrincipal from '../../layouts/LayoutPrincipal';
import Layoutcontenido from '../../Layouts/Layoutcontenido4';
import GridList from './GridList/GridListU';
import Loader from '../../Components/Loader';
import BotonSegundoModal from '../../Components/BotonSegundoModal';
import { ArrowLeftIcon } from '@heroicons/react/24/outline';

const Usuarios = () => {
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);



  const handleGoBack = () => {
    navigate('/dashboard'); // Redirigir al dashboard
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
              <BotonSegundoModal text="Agregar Usuario" id="addUserBtn"/>
            </div>
            <div>
              <GridList />
            </div>
          </div>
        </Layoutcontenido>
      )}
    </LayoutPrincipal>
  );
};

export default Usuarios;
