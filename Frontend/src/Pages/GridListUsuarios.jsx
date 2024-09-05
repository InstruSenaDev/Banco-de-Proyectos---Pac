// GridListUsuarios.js
import LayoutPrincipal from '../Layouts/Layoutprincipal';
import { useEffect, useState } from 'react';
import Layoutcontenido from '../Layouts/Layoutcontenido4';
import GridList from './GridList';
import Loader from '../Components/Loader';

const GridListUsuarios = () => {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
      // Simula un tiempo de carga de 2 segundos
      const timer = setTimeout(() => {
        setLoading(false);
      }, 2000);
  
      return () => clearTimeout(timer);
    }, []);
  return (
    <LayoutPrincipal title="Usuarios">
     {loading ? (
        <div id="loader" className="flex items-center justify-center h-screen">
          <Loader />
        </div>
      ) : (
      <Layoutcontenido title="Usuarios">
        <div className="flex flex-wrap gap-3 justify-center mt-16 z-0 w-full">
          <GridList />
        </div>
      </Layoutcontenido>
    )}
    </LayoutPrincipal>
  );
};

export default GridListUsuarios;
