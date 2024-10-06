import { Title, Text } from '@tremor/react';
import { useEffect, useState } from 'react';
import Layoutprincipal from '../../layouts/LayoutPrincipal1';
import Layoutcontenido from '../../Layouts/Layoutcontenido';
import Loader from '../../Components/Loader';
import BarChartExample from '../../Components/BarChart';
import ComboChartExample from '../../Components/ComboChart';
import DashboardCharts from '../../Components/DashboardCharts'; // Importamos los gráficos


const Dashboard = () => {
  // Estado para controlar la carga de la página
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    // Simula un tiempo de carga de 2 segundos
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);


    // Limpia el temporizador al desmontar el componente
    return () => clearTimeout(timer);
  }, []);

  // Datos de ejemplo
  const projectData = [
    // Datos de progreso de proyectos
    { date: '2024-06-01', completed: 47, "in progress": 83, "on hold": 67 },
    { date: '2024-06-02', completed: 20, "in progress": 97, "on hold": 12 },
    // Agrega más datos aquí
  ];

  const taskData = [
    // Datos de tareas
    { date: '2024-06-01', completed: 10, "in progress": 20, "on hold": 5 },
    { date: '2024-06-02', completed: 8, "in progress": 25, "on hold": 7 },
    // Agrega más datos aquí
  ];


  return (
    <Layoutprincipal title="Proyectos">
      {loading ? (
        // Muestra el loader mientras se cargan los datos
        <div id="loader" className="flex items-center justify-center h-screen">
          <Loader />
        </div>
      ) : (
        <Layoutcontenido title="">
        {/* Gráficos */}
        <div className="mt-8">
            <h2 className="text-xl font-bold">Resumen de Estado</h2>
            <BarChartExample />
            <h2 className="text-xl font-bold mt-8">Combinación de Gráficos</h2>
            <ComboChartExample />
          </div>

          {/* Gráficos */}
          <DashboardCharts projectData={projectData} taskData={taskData} />

        </Layoutcontenido>
      )}
    </Layoutprincipal>
  );
};

export default Dashboard;