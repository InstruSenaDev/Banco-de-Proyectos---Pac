import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Loader from '../../Components/Loader';

// Mapeo de IDs de rol a nombres de rol
const roleNames = {
  1: 'Administrador',
  2: 'Usuario',
  3: 'SuperAdmin',
  4: 'Aprendiz'
};

// eslint-disable-next-line react/prop-types
const Badge = ({ variant, children}) => {
  const bgColor = variant === 'active' ? 'bg-green-200' : 'bg-red-200';
  return <span className={`px-2 py-1 text-sm ${bgColor} rounded-lg`}>{children}</span>;
};

const GridList = ({ fetchUsers }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true); // Estado para manejar la carga

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch('http://localhost:4000/api/personas');
        const users = await response.json();
        setData(users);
      } catch (error) {
        console.error('Error fetching users:', error);
      } finally {
        setLoading(false); // Oculta el loader después de la carga
      }
    };

    fetchUsers();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm('¿Estás seguro de que quieres eliminar este usuario?')) {
      try {
        const response = await fetch(`http://localhost:4000/api/personas/${id}`, {
          method: 'DELETE',
        });
        if (response.ok) {
          console.log('Usuario eliminado con éxito');
          fetchUsers(); // Actualiza la lista de usuarios
        } else {
          const errorData = await response.json();
          console.error('Error al eliminar usuario:', errorData);
          alert(`Error al eliminar usuario: ${errorData.error || 'Error desconocido'}`);
        }
      } catch (error) {
        console.error('Error en la solicitud de eliminación:', error);
        alert('Error en la conexión. Por favor, inténtelo de nuevo.');
      }
    }
  };


  return (
    <div className="w-full max-w-7xl mx-auto bg-white shadow-md rounded-lg overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-[#A3E784] font-bold">
            <tr>
              <th className="px-6 py-3 text-left text-gray-900">Nombre</th>
              <th className="px-6 py-3 text-left text-gray-900">Correo</th>
              <th className="px-6 py-3 text-left text-gray-900">Estado</th>
              <th className="px-6 py-3 text-left text-gray-900">Rol</th>
              <th className="px-6 py-3 text-gray-900">Accion</th>
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
                <td className="px-6 py-4 whitespace-nowrap text-right">
                <div className="flex items-center justify-center ">
                  <button
                        onClick={() => handleDelete(item.idpersonas)}
                        className="p-3 text-red-500 hover:bg-red-100 rounded-lg"
                      >
                        <i className="fas fa-trash-alt"></i>
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

GridList.propTypes = {
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  children: PropTypes.func.isRequired,
  fetchUsers: PropTypes.func.isRequired,
};

export default GridList;
