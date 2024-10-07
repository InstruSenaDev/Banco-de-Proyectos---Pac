import { Title, Text } from '@tremor/react';
import { useEffect, useState } from 'react';
import Layoutprincipal from '../../layouts/LayoutPrincipal1';
import Layoutcontenido from '../../Layouts/Layoutcontenido';
import { CardBase } from '../../Components/CardBase';
import Loader from '../../Components/Loader';
import { BarChartGroupExample } from '../../Components/BarChartGroupExample'; // Asegúrate de que la ruta sea correcta
import  AreaDonutChart  from '../../Components/AreaDonutChart'

const Dashboard = () => {
  // Estado para controlar la carga de la página
  const [loading, setLoading] = useState(true);
  const [chartData, setDataByMonth] = useState([]); // Estado para almacenar datos por meses

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Simula la obtención de datos desde el backend
        const response = await fetch('http://localhost:4000/datos'); // Cambia la URL por tu API real
        const data = await response.json();

        // Procesa los datos para crear el formato que necesitas para el gráfico
        const chartData = data.map(item => ({
          name: item.mes, // Asumiendo que tu API devuelve un campo "mes"
          Usuarios: item.usuarios, // Campo de usuarios desde la API
          Proyectos: item.proyectos, // Campo de proyectos desde la API
        }));

        setDataByMonth(chartData);
      } catch (error) {
        console.error("Error al obtener datos:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <Layoutprincipal title="Proyectos">
      {loading ? (
        // Muestra el loader mientras se cargan los datos
        <div id="loader" className="flex items-center justify-center h-screen">
          <Loader />
        </div>
      ) : (
        <Layoutcontenido title="">
          {/* Encabezado */}
          <div className="bg-Verde p-4 sm:p-6 md:p-8 lg:p-10 rounded">
            <Title className="text-white text-base sm:text-lg md:text-xl lg:text-2xl font-extrabold">Bienvenido SuperAdmin</Title>
            <Text className="text-white font-extrabold text-sm sm:text-base md:text-lg">Banco de Proyectos</Text>
          </div>

          {/* Gráfico de barras para mostrar datos por mes */}
          <div className="mt-8">
            <Title className="text-lg font-bold">Resumen por Mes</Title>
            <BarChartGroupExample data={chartData} />
          </div>

          <div>
      {/* Otros componentes y contenido */}
      <AreaDonutChart />
    </div>

          {/* Contenedor de tarjetas */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 mt-8 sm:mt-12 md:mt-16 z-0 w-full">
            <CardBase
              title="Usuarios"
              progressText="Usuarios Registrados"
              buttonTex="Ver detalle"
              route="/SuperAdmin/usuarios"
            />
            <CardBase
              title="Fichas"
              progressText="Aprendices"
              buttonTex="Ver detalle"
              route="/SuperAdmin/ficha"
            />
            <CardBase
              title="Proyectos"
              progressText="Proyectos creados"
              buttonTex="Ver detalle"
              route="/SuperAdmin/proyectos"
            />
            <CardBase
              title="Areas"
              progressText="Registro proyecto"
              buttonTex="Ver detalle"
              route="/SuperAdmin/areas"
            />
            <CardBase
              title="Tipos de Area"
              progressText="Registro proyecto"
              buttonTex="Ver detalle"
              route="/SuperAdmin/tipodearea"
            />
            <CardBase
              title="Items"
              progressText="Registro proyecto"
              buttonTex="Ver detalle"
              route="/SuperAdmin/items"
            />
            <CardBase
              title="Objetivo"
              progressText="Registro proyecto"
              buttonTex="Ver detalle"
              route="/SuperAdmin/objetivos"
            />
            <CardBase
              title="Alcance"
              progressText="Registro proyecto"
              buttonTex="Ver detalle"
              route="/SuperAdmin/alcance"
            />
            <CardBase
              title="CREAR REGISTRO"
              progressText="Registro de proyecto"
              buttonTex="Ver detalle"
              route="/SuperAdmin/registrocompleto"
            />
          </div>
        </Layoutcontenido>
      )}
    </Layoutprincipal>
  );
};

export default Dashboard;
