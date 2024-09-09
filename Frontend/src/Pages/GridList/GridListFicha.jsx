import { useState, useEffect } from 'react';
import { PencilIcon, TrashIcon } from '@heroicons/react/24/outline';
import PropTypes from 'prop-types';
import Loader from '../../Components/Loader';

const GridListFicha = ({ onEdit,  }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  // eslint-disable-next-line react/prop-types
const Badge = ({ variant, children}) => {
    const bgColor = variant === 'active' ? 'bg-green-200' : 'bg-red-200';
    return <span className={`px-2 py-1 text-sm ${bgColor} rounded-lg`}>{children}</span>;
  };

  useEffect(() => {
    const fetchFicha = async () => {
      try {
        const response = await fetch('http://localhost:4000/api/ficha');
        const ficha = await response.json();
        setData(ficha);
      } catch (error) {
        console.error('Error al obtener las fichas:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchFicha();
  }, []);


  return (
    <div className="w-full max-w-7xl mx-auto bg-white shadow-md rounded-lg overflow-hidden">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-[#A3E784]">
          <tr>
            <th className="px-6 py-3 text-left text-gray-900">Nombre del Ficha</th>
            <th className="px-6 py-3 text-left text-gray-900">Numero ficha</th>
            <th className="px-6 py-3 text-left text-gray-900">Estado</th>
            <th className="px-6 py-3 text-right text-gray-900">Acciones</th>
          </tr>
        </thead>
        {loading ? (
        <div id="loader" className="flex items-center justify-center h-screen absolute inset-0">
          <div className="flex flex-col items-center justify-center h-full">
            <div className="flex-grow" /> {/* Espaciador superior */}
            <Loader />
            <div className="flex-grow" /> {/* Espaciador inferior */}
          </div>
        </div>
      ) : (
        <tbody className="bg-white divide-y divide-gray-200 overflow-hidden">
         {data.map((item) => (
              <tr key={item.idficha}>
                <td className="px-6 py-4 whitespace-nowrap">{item.nombre}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <Badge variant={item.estado ? 'active' : 'inactive'}>
                    {item.estado ? 'Activo' : 'Inactivo'}
                  </Badge>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">{item.numeroficha}</td>
                <td className="px-6 py-4 whitespace-nowrap text-right">
                  <div className="flex space-x-2 justify-end">
                    <button
                      onClick={() => onEdit(item)}
                      className="p-2 text-blue-500 hover:bg-blue-100 rounded-lg"
                    >
                      <PencilIcon className="w-5 h-5" />
                    </button>
                    <button
                      onClick
                      className="p-2 text-red-500 hover:bg-red-100 rounded-lg"
                    >
                      <TrashIcon className="w-5 h-5" />
                    </button>
                  </div>
                </td>
              </tr>
          ))}
        </tbody>
      )}
      </table>
    </div>
  );
};

GridListFicha.propTypes = {
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default GridListFicha;
