import { useState, useEffect } from 'react';
import { PencilIcon, TrashIcon } from '@heroicons/react/24/outline';
import PropTypes from 'prop-types';

const GridListArea = ({ onEdit, onDelete }) => {
  const [areas, setAreas] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAreas = async () => {
      try {
        const response = await fetch('http://localhost:4000/api/area');
        if (!response.ok) {
          throw new Error('Error al obtener áreas: ' + response.statusText);
        }
        const data = await response.json();
        setAreas(data);
      } catch (error) {
        console.error('Error al obtener áreas:', error);
        setAreas([]);
      } finally {
        setLoading(false);
      }
    };

    fetchAreas();
  }, []);

  const handleDelete = (area) => {
    const updatedAreas = areas.filter((a) => a.idarea !== area.idarea);
    setAreas(updatedAreas);
    onDelete(area);
  };

  if (loading) {
    return <p>Cargando áreas...</p>; 
  }

  return (
    <div className="w-full max-w-7xl mx-auto bg-white shadow-md rounded-lg overflow-hidden">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-[#A3E784]">
          <tr>
            <th className="px-6 py-3 text-left text-gray-900">Nombre del Área</th>
            <th className="px-6 py-3 text-right text-gray-900">Acciones</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {areas.length > 0 ? (
            areas.map((area) => (
              <tr key={area.idarea}>
                <td className="px-6 py-4 whitespace-nowrap">{area.nombre}</td>
                <td className="px-6 py-4 whitespace-nowrap text-right">
                  <div className="flex space-x-2 justify-end">
                    <button
                      onClick={() => onEdit(area)}
                      className="p-2 text-blue-500 hover:bg-blue-100 rounded-lg"
                    >
                      <PencilIcon className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => handleDelete(area)}
                      className="p-2 text-red-500 hover:bg-red-100 rounded-lg"
                    >
                      <TrashIcon className="w-5 h-5" />
                    </button>
                  </div>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="2" className="px-6 py-4 text-center">
                No se encontraron áreas.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

GridListArea.propTypes = {
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default GridListArea;
