import { Title, Text } from '@tremor/react';
import { useEffect, useState } from 'react';
import Layoutprincipal from '../../layouts/LayoutPrincipal';
import Layoutcontenido from '../../Layouts/Layoutcontenido';
import { CardBase } from '../../Components/CardBase';
import { ChartDonut } from '../../Components/ChartDonut';
import Loader from '../../Components/Loader';

const Dashboard = () => {
  const [loading, setLoading] = useState(true);
  const [, setUserCount] = useState(0);

  useEffect(() => {
    // Simula un tiempo de carga de 2 segundos
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);

    // Aquí puedes mover la lógica de contar los usuarios sin renderizar la tabla
    const fetchUsers = async () => {
      try {
        const response = await fetch('http://localhost:4000/api/usuarios');
        const usersData = await response.json();
        setUserCount(usersData.length); // Actualiza el conteo de usuarios
      } catch (error) {
        console.error('Error al obtener los usuarios:', error);
      }
    };

    fetchUsers();

    return () => clearTimeout(timer);
  }, []);

  return (
    <Layoutprincipal title="Proyectos">
      {loading ? (
        <div id="loader" className="flex items-center justify-center h-screen">
          <Loader />
        </div>
      ) : (
        <Layoutcontenido title="">
          <div className="bg-Verde p-6 sm:p-10 rounded">
            <Title className="text-white text-lg font-extrabold">Bienvenido SuperAdmin</Title>
            <Text className="text-white font-extrabold">Banco de Proyectos</Text>
          </div>

          <div className="flex flex-wrap gap-3 justify-center mt-16 z-0 w-full">
            <CardBase
              title="Usuarios"
              metricValue={40}
              progressText="Usuarios Registrados"
              buttonTex="Ver detalle"
              route="/SuperAdmin/usuarios"
            />
            <CardBase
              title="Fichas"
              metricValue={20}
              progressText="Aprendices"
              buttonTex="Ver detalle"
              route="/SuperAdmin/ficha"
            />
            <CardBase
              title="Proyectos"
              metricValue={50}
              progressText="Proyectos creados"
              buttonTex="Ver detalle"
              route="/SuperAdmin/proyectos"
            />
            <CardBase
              title="Areas"
              metricValue={20}
              progressText="Registro proyecto"
              buttonTex="Ver detalle"
              route="/SuperAdmin/areas"
            />
            <CardBase
              title="Tipos de Area"
              metricValue={20}
              progressText="Registro proyecto"
              buttonTex="Ver detalle"
              route="/SuperAdmin/tipodearea"
            />
            <CardBase
              title="Items"
              metricValue={20}
              progressText="Registro proyecto"
              buttonTex="Ver detalle"
              route="/SuperAdmin/items"
            />
            <CardBase
              title="Objetivo"
              metricValue={20}
              progressText="Registro proyecto"
              buttonTex="Ver detalle"
              route="/SuperAdmin/objetivos"
            />
            <CardBase
              title="Alcance"
              metricValue={20}
              progressText="Registro proyecto"
              buttonTex="Ver detalle"
              route="/SuperAdmin/alcance"
            />
            <CardBase
              title="CREAR REGISTRO"
              metricValue={20}
              progressText="Registro de proyecto"
              buttonTex="Ver detalle"
              route="/SuperAdmin/areatable"
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