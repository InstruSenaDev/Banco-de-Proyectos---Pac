import React, { useState, useEffect } from 'react';
import { PencilIcon, TrashIcon } from '@heroicons/react/24/outline';
import PropTypes from 'prop-types'

const GridListTipoArea = ({ onEdit, onDelete }) => {
  // Estado para almacenar las áreas y sus tipos de área
  const [areas, setAreas] = useState([]);

  // Simulación de fetch para obtener áreas y tipos de área
  useEffect(() => {
    const fetchAreas = async () => {
      try {
        const response = await fetch('http://localhost:4000/api/areas-con-tipos');
        if (!response.ok) {
          throw new Error(`Error fetching áreas: ${response.statusText}`);
        }
        const data = await response.json();
        setAreas(data); // Asignar el resultado de la API
      } catch (error) {
        console.error('Error fetching áreas:', error);
      }
    };
    
    fetchAreas();
  }, []);

  const handleDelete = (tipoId) => {
    // Simulación para eliminar un tipo de área
    const updatedAreas = areas.map(area => ({
      ...area,
      tipos: area.tipos.filter(tipo => tipo.id !== tipoId),
    }));
    setAreas(updatedAreas);
    onDelete(tipoId);
  };

  return (
    <div className="w-full max-w-7xl mx-auto bg-white shadow-md rounded-lg overflow-hidden">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-[#A3E784]">
          <tr>
            <th className="px-6 py-3 text-left text-gray-900">Área</th>
            <th className="px-6 py-3 text-left text-gray-900">Tipo de Área</th>
            <th className="px-6 py-3 text-right text-gray-900">Acciones</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {areas.length > 0 ? (
            areas.map((area) => (
              <React.Fragment key={area.id}>
                {/* Fila de área */}
                <tr className="bg-gray-100">
                  <td className="px-6 py-4 font-bold" colSpan="3">
                    {area.nombre}
                  </td>
                </tr>

                {/* Tipos de área dentro de esa área */}
                {area.tipos.length > 0 ? (
                  area.tipos.map((tipo) => (
                    <tr key={tipo.id}>
                      <td className="px-6 py-4"></td> {/* Celda vacía para mantener el diseño */}
                      <td className="px-6 py-4">{tipo.nombre}</td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex space-x-2 justify-end">
                          <button
                            onClick={() => onEdit(tipo)}
                            className="p-2 text-blue-500 hover:bg-blue-100 rounded-lg"
                          >
                            <PencilIcon className="w-5 h-5" />
                          </button>
                          <button
                            onClick={() => handleDelete(tipo.id)}
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
                    <td className="px-6 py-4" colSpan="3">No se encontraron tipos de área.</td>
                  </tr>
                )}
              </React.Fragment>
            ))
          ) : (
            <tr>
              <td className="px-6 py-4 text-center" colSpan="3">
                Cargando Tipos de areas...
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

GridListTipoArea.propTypes = {
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default GridListTipoArea;
