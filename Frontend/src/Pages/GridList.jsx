import React, { useState, useEffect } from 'react';
import { PencilIcon, TrashIcon } from '@heroicons/react/24/outline';
import Loader from '../Components/Loader'; // Importa el componente Loader

const Badge = ({ children, variant }) => {
  const bgColor = variant === 'warning' ? 'bg-green-200' : 'bg-red-200';
  return <span className={`px-2 py-1 text-sm ${bgColor} rounded-lg`}>{children}</span>;
};

const GridList = ({ onEdit, onDelete }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:3000/personas'); // Asegúrate de que esta URL sea correcta
        if (!response.ok) {
          throw new Error('La respuesta de la red no fue correcta');
        }
        const data = await response.json();
        setData(data);
      } catch (error) {
        setError('No se han podido recuperar los usuarios');
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleDelete = (item) => {
    // Aquí puedes añadir la lógica para eliminar el usuario desde la base de datos
    const updatedData = data.filter(u => u.correo !== item.correo);
    setData(updatedData);
    onDelete(item);
  };

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return <div className="text-red-500 mb-4">{error}</div>;
  }

  return (
    <div className="w-full max-w-7xl mx-auto bg-white shadow-md rounded-lg overflow-hidden">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-[#A3E784] font-bold">
          <tr>
            <th className="px-6 py-3 text-left text-gray-900">Nombre</th>
            <th className="px-6 py-3 text-left text-gray-900">Correo</th>
            <th className="px-6 py-3 text-left text-gray-900">Estado</th>
            <th className="px-6 py-3 text-left text-gray-900">Rol</th>
            <th className="px-6 py-3 text-left text-gray-900">Acciones</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {data.map((item) => (
            <tr key={item.correo}>
              <td className="px-6 py-4 whitespace-nowrap">{item.nombre}</td>
              <td className="px-6 py-4 whitespace-nowrap">{item.correo}</td>
              <td className="px-6 py-4 whitespace-nowrap">
                <Badge variant={item.estado === 'Inactive' ? 'warning' : 'default'}>{item.estado}</Badge>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">{item.rol}</td>
              <td className="px-6 py-4 whitespace-nowrap text-right">
                <div className="flex space-x-2">
                  <button 
                    onClick={() => onEdit(item)} 
                    className="p-2 text-blue-500 hover:bg-blue-100 rounded-lg">
                    <PencilIcon className="w-5 h-5" />
                  </button>
                  <button 
                    onClick={() => handleDelete(item)} 
                    className="p-2 text-red-500 hover:bg-red-100 rounded-lg">
                    <TrashIcon className="w-5 h-5" />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default GridList;
