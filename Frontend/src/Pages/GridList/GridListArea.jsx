import { useState, useEffect } from 'react';
import { PencilIcon, TrashIcon } from '@heroicons/react/24/outline';
import PropTypes from 'prop-types';
import Loader from '../../Components/Loader';

const GridListArea = ({ onEdit,  }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAreas = async () => {
      try {
        const response = await fetch('http://localhost:4000/api/areas');
        const areas = await response.json();
        setData(areas);
      } catch (error) {
        console.error('Error al obtener áreas:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchAreas();
  }, []);


  return (
    <div className="w-full max-w-7xl mx-auto bg-white shadow-md rounded-lg overflow-hidden">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-[#A3E784]">
          <tr>
            <th className="px-6 py-3 text-left text-gray-900">Nombre del Área</th>
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
              <tr key={item.idarea}>
                <td className="px-6 py-4 whitespace-nowrap">{item.area}</td>
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

GridListArea.propTypes = {
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default GridListArea;
