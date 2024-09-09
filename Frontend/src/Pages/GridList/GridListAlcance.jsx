import React, { useState, useEffect } from 'react';
import { PencilIcon, TrashIcon, ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/24/outline';
import PropTypes from 'prop-types';
import Loader from '../../Components/Loader';

const GridListAlcances = ({ onEdit, onDelete }) => {
  const [categorias, setCategorias] = useState([]);
  const [groupedAlcances, setGroupedAlcances] = useState({});
  const [loading, setLoading] = useState(true);
  const [openCategorias, setOpenCategorias] = useState({});

  useEffect(() => {
    const fetchAlcances = async () => {
      try {
        const response = await fetch('http://localhost:4000/api/alcances');
        if (!response.ok) {
          throw new Error(`Error fetching alcances: ${response.statusText}`);
        }
        const data = await response.json();

        // Agrupar los alcances por categoría
        const grouped = data.reduce((acc, alcance) => {
          if (!acc[alcance.categoria]) {
            acc[alcance.categoria] = [];
          }
          acc[alcance.categoria].push(alcance);
          return acc;
        }, {});
        setCategorias(Object.keys(grouped));
        setGroupedAlcances(grouped);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching alcances:', error);
        setLoading(false);
      }
    };

    fetchAlcances();
  }, []);

  const handleToggleCategoria = (categoria) => {
    setOpenCategorias((prevOpenCategorias) => ({
      ...prevOpenCategorias,
      [categoria]: !prevOpenCategorias[categoria],
    }));
  };

  return (
    <div className="w-full max-w-7xl mx-auto bg-white shadow-md rounded-lg overflow-hidden">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-[#A3E784]">
          <tr>
            <th className="px-6 py-3 text-left text-gray-900 w-full">Nombre de la Categoría</th>
            <th className="px-6 py-3 text-right text-gray-900 w-32">Acciones</th>
          </tr>
        </thead>
        {loading ? (
          <tbody>
            <tr>
              <td colSpan="2" className="flex items-center justify-center h-screen">
                <div className="flex flex-col items-center justify-center h-full">
                  <Loader />
                </div>
              </td>
            </tr>
          </tbody>
        ) : (
          <tbody className="bg-white divide-y divide-gray-200">
            {categorias.map((categoria) => (
              <React.Fragment key={categoria}>
                <tr className="bg-gray-50">
                  <td
                    className="px-6 py-4 whitespace-nowrap cursor-pointer flex items-center"
                    onClick={() => handleToggleCategoria(categoria)}
                  >
                    {openCategorias[categoria] ? (
                      <ChevronUpIcon className="w-5 h-5 mr-2" />
                    ) : (
                      <ChevronDownIcon className="w-5 h-5 mr-2" />
                    )}
                    <span className="font-bold text-gray-900">{categoria}</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right">
                    <div className="flex space-x-2 justify-end">
                      <button
                        onClick={() => onEdit(categoria)}
                        className="p-2 text-blue-500 hover:bg-blue-100 rounded-lg"
                      >
                        <PencilIcon className="w-5 h-5" />
                      </button>
                      <button
                        onClick={() => onDelete(categoria)}
                        className="p-2 text-red-500 hover:bg-red-100 rounded-lg"
                      >
                        <TrashIcon className="w-5 h-5" />
                      </button>
                    </div>
                  </td>
                </tr>
                {openCategorias[categoria] && groupedAlcances[categoria] && groupedAlcances[categoria].map((alcance) => (
                  <tr key={alcance.idalcance}>
                    <td className="px-6 py-4 whitespace-nowrap pl-8" colSpan="2">
                      <div className="flex flex-col">
                        <span className="font-medium">{alcance.descripcion}</span>
                      </div>
                    </td>
                  </tr>
                ))}
              </React.Fragment>
            ))}
          </tbody>
        )}
      </table>
    </div>
  );
};

GridListAlcances.propTypes = {
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default GridListAlcances;
