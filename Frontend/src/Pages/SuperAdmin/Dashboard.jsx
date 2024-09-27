import { Title, Text } from '@tremor/react';
import { useEffect, useState } from 'react';
import Layoutprincipal from '../../layouts/LayoutPrincipal1';
import Layoutcontenido from '../../Layouts/Layoutcontenido';
import { CardBase } from '../../Components/CardBase';
import { ChartDonut } from '../../Components/ChartDonut';
import Loader from '../../Components/Loader';

const Dashboard = () => {
  const [loading, setLoading] = useState(true);

  // Estados para cada tabla
  const [userCount, setUserCount] = useState(0);
  const [fichaCount, setFichaCount] = useState(0);
  const [proyectoCount, setProyectoCount] = useState(0);
  const [areaCount, setAreaCount] = useState(0);
  const [tipoAreaCount, setTipoAreaCount] = useState(0);
  const [itemCount, setItemCount] = useState(0);
  const [objetivoCount, setObjetivoCount] = useState(0);
  const [alcanceCount, setAlcanceCount] = useState(0);

  useEffect(() => {
    // Simula un tiempo de carga de 2 segundos
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);

    // Fetch de cada tabla
    const fetchCounts = async () => {
      try {
        const [personasRes, fichasRes, proyectosRes, areasRes, tiposAreaRes, itemsRes, objetivosRes, alcancesRes] = await Promise.all([
          fetch('http://localhost:4000/api/personas'),
          fetch('http://localhost:4000/api/ficha'),
          fetch('http://localhost:4000/api/proyecto'),
          fetch('http://localhost:4000/api/areas'),
          fetch('http://localhost:4000/api/tipos-de-area'),
          fetch('http://localhost:4000/api/items'),
          fetch('http://localhost:4000/api/objetivos'),
          fetch('http://localhost:4000/api/alcances')
        ]);

        const personasData = await personasRes.json();
        const fichasData = await fichasRes.json();
        const proyectosData = await proyectosRes.json();
        const areasData = await areasRes.json();
        const tiposAreaData = await tiposAreaRes.json();
        const itemsData = await itemsRes.json();
        const objetivosData = await objetivosRes.json();
        const alcancesData = await alcancesRes.json();

        // Actualiza los estados con las cantidades
        setUserCount(personasData.length);
        setFichaCount(fichasData.length);
        setProyectoCount(proyectosData.length);
        setAreaCount(areasData.length);
        setTipoAreaCount(tiposAreaData.length);
        setItemCount(itemsData.length);
        setObjetivoCount(objetivosData.length);
        setAlcanceCount(alcancesData.length);
      } catch (error) {
        console.error('Error al obtener los datos:', error);
      }
    };

    fetchCounts();

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
              metricValue={userCount}
              progressText="Usuarios Registrados"
              buttonTex="Ver detalle"
              route="/SuperAdmin/usuarios"
            />
            <CardBase
              title="Fichas"
              metricValue={fichaCount}
              progressText="Aprendices"
              buttonTex="Ver detalle"
              route="/SuperAdmin/ficha"
            />
            <CardBase
              title="Proyectos"
              metricValue={proyectoCount}
              progressText="Proyectos creados"
              buttonTex="Ver detalle"
              route="/SuperAdmin/proyectos"
            />
            <CardBase
              title="Areas"
              metricValue={areaCount}
              progressText="Registro proyecto"
              buttonTex="Ver detalle"
              route="/SuperAdmin/areas"
            />
            <CardBase
              title="Tipos de Area"
              metricValue={tipoAreaCount}
              progressText="Registro proyecto"
              buttonTex="Ver detalle"
              route="/SuperAdmin/tipodearea"
            />
            <CardBase
              title="Items"
              metricValue={itemCount}
              progressText="Registro proyecto"
              buttonTex="Ver detalle"
              route="/SuperAdmin/items"
            />
            <CardBase
              title="Objetivo"
              metricValue={objetivoCount}
              progressText="Registro proyecto"
              buttonTex="Ver detalle"
              route="/SuperAdmin/objetivos"
            />
            <CardBase
              title="Alcance"
              metricValue={alcanceCount}
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

          <div className="border-[1px] rounded-t-lg mt-10">
            <ChartDonut />
          </div>
        </Layoutcontenido>
      )}
    </Layoutprincipal>
  );
};

export default Dashboard;
