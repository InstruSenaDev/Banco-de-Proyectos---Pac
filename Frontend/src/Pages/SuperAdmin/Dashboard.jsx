import { Title, Text } from '@tremor/react';
import { useEffect, useState } from 'react';
import Layoutprincipal from '../../layouts/LayoutPrincipal1';
import Layoutcontenido from '../../Layouts/Layoutcontenido';
import { CardBase } from '../../Components/CardBase';
import Loader from '../../Components/Loader';
import BarChartExample from '../../Components/BarChart'; 
import ComboChartExample from '../../Components/ComboChart';



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

        {/* Gráficos */}
        <div className="mt-8">
            <h2 className="text-xl font-bold">Resumen de Estado</h2>
            <BarChartExample />
            <h2 className="text-xl font-bold mt-8">Combinación de Gráficos</h2>
            <ComboChartExample />
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