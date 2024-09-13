import React, { useState } from 'react';

const AreaTable = () => {
  const [expandedRows, setExpandedRows] = useState({});

  const toggleRow = (areaId) => {
    setExpandedRows(prev => ({
      ...prev,
      [areaId]: !prev[areaId]
    }));
  };

  const areas = [
    {
      id: 1,
      name: 'Área 7',
      types: [
        { type: 'Tipo de área A', items: ['Item 1', 'Item 2', 'Item 3'] },
        { type: 'Tipo de área B', items: ['Item 10', 'Item 11'] },
        { type: 'Tipo de área C', items: ['Item 12', 'Item 13'] },
        { type: 'Tipo de área D', items: ['Item 14'] },
        { type: 'Tipo de área E', items: ['Item 15', 'Item 16'] }
      ]
    },
    {
      id: 2,
      name: 'Área 2',
      types: [
        { type: 'Tipo de área F', items: ['Item 4', 'Item 5'] },
        { type: 'Tipo de área G', items: ['Item 6'] },
        { type: 'Tipo de área H', items: ['Item 7'] }
      ]
    },
    {
      id: 3,
      name: 'Área 3',
      types: [
        { type: 'Tipo de área I', items: ['Item 8', 'Item 9'] },
        { type: 'Tipo de área J', items: ['Item 10'] }
      ]
    }
  ];

  return (
    <div className="w-full max-w-7xl mx-auto bg-white shadow-md rounded-lg overflow-hidden">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-[#A3E784]">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-900 uppercase tracking-wider">Área</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-900 uppercase tracking-wider">Acciones</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {areas.map(area => (
            <React.Fragment key={area.id}>
              <tr className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{area.name}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  <button
                    onClick={() => toggleRow(area.id)}
                    className="px-4 py-2 rounded-md text-sm font-medium transition-colors duration-150 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 bg-indigo-100 text-indigo-700 hover:bg-indigo-200"
                  >
                    {expandedRows[area.id] ? 'Ocultar' : 'Ver Tipos de Área'}
                  </button>
                </td>
              </tr>
              {expandedRows[area.id] && (
                <tr className="bg-gray-50">
                  <td colSpan="2" className="px-6 py-4">
                    <div className="ml-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                      {area.types.map((type, index) => (
                        <div key={index} className="bg-white p-3 rounded-md shadow-sm border border-gray-200">
                          <h5 className="font-semibold text-gray-800">{type.type}</h5>
                          <ul className="mt-2 list-disc list-inside">
                            {type.items.map((item, itemIndex) => (
                              <li key={itemIndex} className="text-sm text-gray-600">{item}</li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  </td>
                </tr>
              )}
            </React.Fragment>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AreaTable;
