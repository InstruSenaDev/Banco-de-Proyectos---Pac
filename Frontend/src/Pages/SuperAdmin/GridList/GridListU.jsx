import { useState, useEffect } from 'react';
import Loader from '../../../Components/Loader';
import PropTypes from 'prop-types';

const roleNames = {
  1: 'Administrador',
  2: 'Usuario',
  3: 'SuperAdmin',
  4: 'Aprendiz',
};

// Componente Badge
const Badge = ({ variant, children }) => {
  const bgColor = variant === 'active' ? 'bg-green-200' : 'bg-red-200';
  return <span className={`px-2 py-1 text-sm ${bgColor} rounded-lg`}>{children}</span>;
};

Badge.propTypes = {
  variant: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};

// Componente GridList
const GridList = ({ setUserCount }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchUsers = async () => {
    try {
      const response = await fetch('http://localhost:4000/api/personas');
      const users = await response.json();
      setData(users);
      setUserCount(users.length);
    } catch (error) {
      console.error('Error fetching users:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className="w-full max-w-7xl mx-auto bg-white shadow-md rounded-lg overflow-hidden">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-[#A3E784] font-bold">
          <tr>
            <th className="px-6 py-3 text-left text-gray-900">Nombre</th>
            <th className="px-6 py-3 text-left text-gray-900">Correo</th>
            <th className="px-6 py-3 text-left text-gray-900">Estado</th>
            <th className="px-6 py-3 text-left text-gray-900">Rol</th>
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
          <tbody className="bg-white divide-y divide-gray-200 overflow-hidden">
            {data.map((item) => (
              <tr key={item.idpersonas}>
                <td className="px-6 py-4 whitespace-nowrap">{item.nombre}</td>
                <td className="px-6 py-4 whitespace-nowrap">{item.correo}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <Badge variant={item.estado ? 'active' : 'inactive'}>
                    {item.estado ? 'Activo' : 'Inactivo'}
                  </Badge>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
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
