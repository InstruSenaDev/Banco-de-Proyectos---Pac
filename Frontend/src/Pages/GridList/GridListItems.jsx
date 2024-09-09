import React from 'react';
import { useState, useEffect } from 'react';
import { PencilIcon, TrashIcon, ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/24/outline';
import PropTypes from 'prop-types';
import Loader from '../../Components/Loader';

const GridListArea = ({ onEdit, onDelete }) => {
  const [areas, setAreas] = useState([]);
  const [tipos, setTipos] = useState({});
  const [loading, setLoading] = useState(true);
  const [openAreas, setOpenAreas] = useState({});

  useEffect(() => {
    const fetchAreas = async () => {
      try {
        const response = await fetch('http://localhost:4000/api/areas');
        if (!response.ok) {
          throw new Error(`Error fetching areas: ${response.statusText}`);
        }
        const data = await response.json();
        setAreas(data);
      } catch (error) {
        console.error('Error fetching areas:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchAreas();
  }, []);

  const fetchTiposDeArea = async (idArea) => {
    try {
      const response = await fetch(`http://localhost:4000/api/tipos-de-area/${idArea}`);
      if (!response.ok) {
        throw new Error(`Error fetching tipos de area: ${response.statusText}`);
      }
      const data = await response.json();
      setTipos((prevTipos) => ({
        ...prevTipos,
        [idArea]: data
      }));
    } catch (error) {
      console.error('Error fetching tipos de area:', error);
    }
  };

  const handleToggleArea = (idArea) => {
    setOpenAreas((prevOpenAreas) => {
      const isCurrentlyOpen = prevOpenAreas[idArea];
      return { ...prevOpenAreas, [idArea]: !isCurrentlyOpen };
    });

    if (!tipos[idArea]) {
      fetchTiposDeArea(idArea);
    }
  };

  return (
    <div className="w-full max-w-7xl mx-auto bg-white shadow-md rounded-lg overflow-hidden">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-[#A3E784]">
          <tr>
            <th className="px-6 py-3 text-left text-gray-900 w-full">Nombre del Área</th>
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
            {areas.map((area) => (
              <React.Fragment key={area.idarea}>
                <tr className="bg-gray-100">
                  <td
                    className="px-6 py-4 whitespace-nowrap cursor-pointer flex items-center"
                    onClick={() => handleToggleArea(area.idarea)}
                  >
                    {openAreas[area.idarea] ? (
                      <ChevronUpIcon className="w-5 h-5 mr-2" />
                    ) : (
                      <ChevronDownIcon className="w-5 h-5 mr-2" />
                    )}
                    <span className="font-bold text-gray-900">{area.area}</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right">
                    <div className="flex space-x-2 justify-end">
                      <button
                        onClick={() => onEdit(area)}
                        className="p-2 text-blue-500 hover:bg-blue-100 rounded-lg"
                      >
                        <PencilIcon className="w-5 h-5" />
                      </button>
                      <button
                        onClick={() => onDelete(area)}
                        className="p-2 text-red-500 hover:bg-red-100 rounded-lg"
                      >
                        <TrashIcon className="w-5 h-5" />
                      </button>
                    </div>
                  </td>
                </tr>
                {openAreas[area.idarea] && tipos[area.idarea] && tipos[area.idarea].map((tipo) => (
                  <tr key={tipo.idtipoarea}>
                    <td className="px-6 py-4 whitespace-nowrap pl-8" colSpan="2">
                      {tipo.tiposdearea}
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

GridListArea.propTypes = {
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default GridListArea;