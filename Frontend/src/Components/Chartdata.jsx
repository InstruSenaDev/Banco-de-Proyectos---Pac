import React, { useEffect, useState } from 'react';
import { BarChart } from '@tremor/react';

const dataFormatter = (number) =>
  Intl.NumberFormat('us').format(number).toString();

export function Chartdata() {  // Aquí cambia el nombre a Chartdata
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProyectos = async () => {
      try {
        const response = await fetch('http://localhost:4000/api/superAdmin/proyecto');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const proyectos = await response.json();
        console.log('Proyectos obtenidos:', proyectos);
        
        // Agrupar los proyectos por estado
        const proyectosAgrupados = agruparPorEstado(proyectos);
        setData(proyectosAgrupados);
      } catch (error) {
        console.error('Error fetching projects:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProyectos();
  }, []);

  // Función para agrupar los proyectos por estado
  const agruparPorEstado = (proyectos) => {
    const estados = {
      'Proyectos aceptados': 0,
      'Proyectos rechazados': 0,
      'Proyectos devueltos': 0,
      'Proyectos en proceso': 0,
    };

    proyectos.forEach((proyecto) => {
      switch (proyecto.estado) {
        case 'aceptado':
          estados['Proyectos aceptados'] += 1;
          break;
        case 'rechazado':
          estados['Proyectos rechazados'] += 1;
          break;
        case 'devuelto':
          estados['Proyectos devueltos'] += 1;
          break;
        case 'en proceso':
          estados['Proyectos en proceso'] += 1;
          break;
        default:
          break;
      }
    });

    // Convertir el objeto en un arreglo compatible con el BarChart
    return Object.entries(estados).map(([name, value]) => ({
      name,
      'Proyectos': value,
    }));
  };

  if (loading) {
    return <div>Cargando...</div>; // Puedes reemplazar esto con un componente `Loader`
  }

  return (
    <>
      <p className="text-lg font-medium text-tremor-content-strong dark:text-dark-tremor-content-strong">
        Total de proyectos en el sistema
      </p>
      <BarChart
        className="mt-6"
        data={data}
        index="name"
        categories={['Proyectos']}
        colors={['green']}
        valueFormatter={dataFormatter}
        yAxisWidth={48}
      />
    </>
  );
}
