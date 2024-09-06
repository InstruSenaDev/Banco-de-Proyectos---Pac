import { useEffect, useState } from 'react';
import LayoutPrincipal from '../Layouts/LayoutPrincipal.jsx';
import GridDevolver from '../Components/GridDevolver.jsx';
import Loader from '../Components/Loader';

const Prueba = () => {
    const [loading, setLoading] = useState(true);
    const [users, setUsers] = useState([]);

    useEffect(() => {
      // Simula un tiempo de carga de 2 segundos y carga los usuarios de prueba
      const timer = setTimeout(() => {
        setLoading(false);

        // Ejemplo de usuarios de prueba
        setUsers([
          { id: 1, nombre: "Juan", rol: "Admin", estado: "Activo" },
          { id: 2, nombre: "Maria", rol: "Usuario", estado: "Inactivo" },
        ]);
      }, 2000);
  
      return () => clearTimeout(timer);
    }, []);

    return (
      <LayoutPrincipal title="Gestión de Usuarios">
        {loading ? (
          <div id="loader" className="flex items-center justify-center h-screen">
            <Loader />
          </div>
        ) : (
          <div className="flex justify-center min-h-screen">
            <div className="p-10 w-full max-w-7xl my-10">
              <div className="flex flex-col">
                <div className="grid grid-cols-12 bg-[#A3E784] font-bold py-4 rounded-t-lg border-b">
                  <div className="col-span-12 md:col-span-10 text-center md:text-left px-6">PROYECTOS</div>
                  <div className="col-span-12 md:col-span-2 text-center md:text-left px-6">ESTADO</div>
                </div>

                {/* Renderizar el componente GridDevolver con los usuarios de prueba */}
                <GridDevolver users={users} />

              </div>
            </div>
          </div>
        )}
      </LayoutPrincipal>
    );
};

export default Prueba;
