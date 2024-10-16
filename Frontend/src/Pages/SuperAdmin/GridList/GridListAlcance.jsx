import React, { useState, useEffect } from 'react';


const GridListAlcances = () => {
  const [categorias, setCategorias] = useState([]);
  const [groupedAlcances, setGroupedAlcances] = useState({});
  const [setLoading] = useState(true);
  const [openCategorias, setOpenCategorias] = useState({});

  useEffect(() => {
    const fetchAlcances = async () => {
      try {
        const response = await fetch('http://localhost:4000/api/superAdmin/alcances');
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
        <thead className="bg-[#2eb694]">
          <tr>
            <th className="px-6 py-3 text-left text-white w-full">Nombre de la Categoría</th>
          </tr>
        </thead>
          <tbody className="min-w-full bg-white divide-y divide-gray-200">
            {categorias.map((categoria) => (
              <React.Fragment key={categoria}>
                <tr className="bg-gray-50">
                  <td
                    className="px-6 py-4 whitespace-nowrap flex items-center w-full"
                    onClick={() => handleToggleCategoria(categoria)}
                  >
                  {openCategorias[categoria] ? (
                      <i className="fas fa-chevron-up w-5 h-5 mr-2" />
                    ) : (
                      <i className="fas fa-chevron-down w-5 h-5 mr-2" />
                    )}
                    <span className="font-bold text-gray-900">{categoria}</span>
                  </td>
                </tr>
                {openCategorias[categoria] && groupedAlcances[categoria] && groupedAlcances[categoria].map((alcance) => (
                  <tr key={alcance.idalcance}>
                    <td className="px-6 py-4 whitespace-nowrap pl-8 w-full" colSpan="2">
                        <span className="font-medium text-gray-900">{alcance.descripcion}</span>
                    </td>
                  </tr>
                ))}
              </React.Fragment>
            ))}
          </tbody>
      </table>
    </div>
  );
};


export default GridListAlcances;