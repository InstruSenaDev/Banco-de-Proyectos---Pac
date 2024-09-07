import { useState, useEffect } from 'react';
import LayoutPrincipal from '../Layouts/LayoutPrincipal';
import Layoutcontenido from '../Layouts/Layoutcontenido4';
import GridListProyectos from './GridListProyectos';
import Loader from '../Components/Loader';


const Proyectos = () => {
  const [loading, setLoading] = useState(true);
  const [ setCurrentUser] = useState(null);
  const [ setActionType] = useState('');

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);


  const handleDeleteClick = (user) => {
    setCurrentUser(user);
    setActionType('delete');
  };

;

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
              <p className="mt-4 text-xl leading-6 text-black text-left">
              PROYECTOS REGISTRADOS
              </p>
            </div>
            <div className="bg-white shadow-md rounded-lg overflow-hidden">
              <GridListProyectos onDelete={handleDeleteClick} />
            </div>
          </div>
        </Layoutcontenido>
      )}
    </LayoutPrincipal>
  );
};

export default Proyectos;
