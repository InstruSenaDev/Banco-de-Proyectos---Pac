
import { Title, Text } from '@tremor/react';
import { useEffect, useState } from 'react';
import Layoutprincipal from '../Layouts/Layoutprincipal';
import Layoutcontenido from '../Layouts/Layoutcontenido';
import { CardBase } from '../Components/CardBase';
import { ChartDonut } from '../Components/ChartDonut';
import Loader from '../Components/Loader';

const Dashboard = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simula un tiempo de carga de 2 segundos
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    
    <Layoutprincipal title="Proyectos">
      {loading ? (
        <div id="loader" className="flex items-center justify-center h-screen">
          <Loader />
        </div>
      ) : (
        <Layoutcontenido title="Contenido">
          <div className="bg-Verde p-6 sm:p-10 rounded">
            <Title className="text-white text-lg font-extrabold">Bienvenido SuperAdmin</Title>
            <Text className="text-white font-extrabold">Banco de Proyectos</Text>
          </div>

          <div className="flex flex-wrap gap-3 justify-center mt-16 z-0 w-full">
            <CardBase
              title="Areas"
              metricValue={20}
              progressText="Proyectos creados"
              buttonTex="Ver detalle"
            />
            <CardBase
              title="Crear Instructores"
              metricValue={50}
              progressText="Proyectos creados"
              buttonTex="Ver detalle"
            />
            <CardBase
              title="Crear Aprendices"
              metricValue={40}
              progressText="Proyectos creados"
              buttonTex="Ver detalle"
            />
            <CardBase
              title="Crear Objetivos"
              metricValue={90}
              progressText="Proyectos creados"
              buttonTex="Ver detalle"
            />
            <CardBase
              title="Usuarios"
              metricValue={50}
              progressText="Proyectos creados"
              buttonTex="Ver detalle"
              route="/usuarios"
            />
            <CardBase
              title="Proyectos"
              metricValue={50}
              progressText="Proyectos creados"
              buttonTex="Ver detalle"
            />
          </div>

          <div className="border-[1px] rounded-t-lg mt-10">
            <ChartDonut />
          </div>
        </Layoutcontenido>
      )}
    </Layoutprincipal>
  );
};

export default Dashboard;
