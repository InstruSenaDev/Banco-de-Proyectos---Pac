import { useState } from 'react';
import { PencilIcon, TrashIcon } from '@heroicons/react/24/outline';

const Badge = ({ children, variant }) => {
  const bgColor = variant === 'warning' ? 'bg-green-200' : 'bg-red-200';
  return <span className={`px-2 py-1 text-sm ${bgColor} rounded-lg`}>{children}</span>;
};

const GridListProyectos = ({ onEdit, onDelete }) => {
  const [data, setData] = useState([
    { workspace: 'sales_by_day_api', owner: 'John Doe', status: 'Live' },
    { workspace: 'marketing_campaign', owner: 'Jane Smith', status: 'Live' },
    { workspace: 'test_environment', owner: 'David Clark', status: 'Inactive' },
    { workspace: 'sales_campaign', owner: 'Jane Smith', status: 'Live' },
    { workspace: 'development_env', owner: 'Mike Johnson', status: 'Inactive' },
    { workspace: 'new_workspace_1', owner: 'Alice Brown', status: 'Inactive' },
  ]);

  const handleDelete = (item) => {
    const updatedData = data.filter(d => d.workspace !== item.workspace);
    setData(updatedData);
    onDelete(item);
  };

  return (
    <div className="w-full max-w-7xl mx-auto bg-white shadow-md rounded-lg overflow-hidden">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-[#A3E784]">
          <tr>
            <th className="px-6 py-3 text-left text-gray-900">Nombre</th>
            <th className="px-6 py-3 text-left text-gray-900">Responsable</th>
            <th className="px-6 py-3 text-left text-gray-900">Estado</th>
            <th className="px-6 py-3 text-right text-gray-900">Acciones</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {data.map((item) => (
            <tr key={item.workspace}>
              <td className="px-6 py-4 whitespace-nowrap">{item.workspace}</td>
              <td className="px-6 py-4 whitespace-nowrap">{item.owner}</td>
              <td className="px-6 py-4 whitespace-nowrap">
                <Badge variant={item.status === 'Inactive' ? 'warning' : 'default'}>
                  {item.status}
                </Badge>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-right">
                <div className="flex space-x-2 justify-end">
                  <button 
                    onClick={() => onEdit(item)} 
                    className="p-2 text-blue-500 hover:bg-blue-100 rounded-lg"
                  >
                    <PencilIcon className="w-5 h-5" />
                  </button>
                  <button 
                    onClick={() => handleDelete(item)} 
                    className="p-2 text-red-500 hover:bg-red-100 rounded-lg"
                  >
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

export default GridListProyectos;
