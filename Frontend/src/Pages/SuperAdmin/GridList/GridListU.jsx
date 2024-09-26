import { useState, useEffect } from 'react';
import Loader from '../../../Components/Loader';
import PropTypes from 'prop-types';

// Objeto que mapea los IDs de roles a sus nombres
const roleNames = {
  1: 'Administrador',
  2: 'Usuario',
  3: 'SuperAdmin',
  4: 'Aprendiz',
};

// Componente Badge para mostrar el estado del usuario
const Badge = ({ variant, children }) => {
  const bgColor = variant === 'active' ? 'bg-green-200' : 'bg-red-200';
  return <span className={`px-2 py-1 text-xs sm:text-sm ${bgColor} rounded-lg`}>{children}</span>;
};

Badge.propTypes = {
  variant: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};

// Componente principal GridList
const GridList = ({ setUserCount }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  // Función para obtener los usuarios de la API
  const fetchUsers = async () => {
    try {
      const response = await fetch('http://localhost:4000/api/personas');
      const users = await response.json();
      setData(users);
      setUserCount(users.length);
    } catch (error) {
      console.error('Error al obtener usuarios:', error);
    } finally {
      setLoading(false);
    }
  };

  // Efecto para cargar los usuarios al montar el componente
  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className="w-full max-w-7xl mx-auto bg-white shadow-md rounded-lg overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-[#A3E784] font-bold">
          <tr>
            <th className="px-4 sm:px-6 py-3 text-left text-xs sm:text-sm text-gray-900">Nombre</th>
            <th className="px-4 sm:px-6 py-3 text-left text-xs sm:text-sm text-gray-900">Correo</th>
            <th className="px-4 sm:px-6 py-3 text-left text-xs sm:text-sm text-gray-900">Estado</th>
            <th className="px-4 sm:px-6 py-3 text-left text-xs sm:text-sm text-gray-900">Rol</th>
          </tr>
        </thead>
        {loading ? (
          <tbody>
            <tr>
              <td colSpan="4" className="text-center py-4">
                <Loader />
              </td>
            </tr>
          </tbody>
        ) : (
          <tbody className="bg-white divide-y divide-gray-200">
            {data.map((item) => (
              <tr key={item.idpersonas}>
                <td className="px-4 sm:px-6 py-4 whitespace-nowrap text-xs sm:text-sm">{item.nombre}</td>
                <td className="px-4 sm:px-6 py-4 whitespace-nowrap text-xs sm:text-sm">{item.correo}</td>
                <td className="px-4 sm:px-6 py-4 whitespace-nowrap">
                  <Badge variant={item.estado ? 'active' : 'inactive'}>
                    {item.estado ? 'Activo' : 'Inactivo'}
                  </Badge>
                </td>
                <td className="px-4 sm:px-6 py-4 whitespace-nowrap text-xs sm:text-sm">
                  {roleNames[item.idrol] || 'Desconocido'}
                </td>
              </tr>
            ))}
          </tbody>
        )}
      </table>
    </div>
  );
};

GridList.propTypes = {
  setUserCount: PropTypes.func.isRequired,
};

export default GridList;