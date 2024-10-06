import React from 'react';
import { Card, Title, DonutChart, BarChart, AreaChart, Grid } from '@tremor/react';
import CardBase from '../../Components/CardBase'; // Asegúrate de importar tu componente personalizado

function Dashboard() {
  // Datos de ejemplo
  const donutData = [
    { name: 'Ventas', value: 5000 },
    { name: 'Marketing', value: 3000 },
    { name: 'Operaciones', value: 2000 },
  ];

  const areaData = [
    { mes: 'Enero', ventas: 2000, marketing: 1500, operaciones: 800 },
    { mes: 'Febrero', ventas: 2500, marketing: 1800, operaciones: 1000 },
    { mes: 'Marzo', ventas: 3000, marketing: 2000, operaciones: 1500 },
  ];

  return (
    <div className="p-6">
      <Title>Dashboard Overview</Title>
      <Grid numColsLg={3} numColsMd={2} numColsSm={1} className="gap-6 mt-6">
        {/* Cards con gráficos o tablas correspondientes */}
        <CardBase
          title="Usuarios"
          progressText="Usuarios Registrados"
          buttonTex="Ver detalle"
          route="/SuperAdmin/usuarios"
        >
          <DonutChart data={donutData} category="value" dataKey="name" />
        </CardBase>

        <CardBase
          title="Fichas"
          progressText="Aprendices"
          buttonTex="Ver detalle"
          route="/SuperAdmin/ficha"
        >
          <AreaChart
            data={areaData}
            index="mes"
            categories={['ventas', 'marketing', 'operaciones']}
            colors={['indigo', 'cyan', 'emerald']}
          />
        </CardBase>

        <CardBase
          title="Proyectos"
          progressText="Proyectos creados"
          buttonTex="Ver detalle"
          route="/SuperAdmin/proyectos"
        >
          <DonutChart data={donutData} category="value" dataKey="name" />
        </CardBase>

        <CardBase
          title="Areas"
          progressText="Registro proyecto"
          buttonTex="Ver detalle"
          route="/SuperAdmin/areas"
        >
          <AreaChart
            data={areaData}
            index="mes"
            categories={['ventas', 'marketing', 'operaciones']}
            colors={['indigo', 'cyan', 'emerald']}
          />
        </CardBase>

        <CardBase
          title="Tipos de Area"
          progressText="Registro proyecto"
          buttonTex="Ver detalle"
          route="/SuperAdmin/tipodearea"
        >
          <DonutChart data={donutData} category="value" dataKey="name" />
        </CardBase>

        <CardBase
          title="Items"
          progressText="Registro proyecto"
          buttonTex="Ver detalle"
          route="/SuperAdmin/items"
        >
          <DonutChart data={donutData} category="value" dataKey="name" />
        </CardBase>

        <CardBase
          title="Objetivo"
          progressText="Registro proyecto"
          buttonTex="Ver detalle"
          route="/SuperAdmin/objetivos"
        >
          <AreaChart
            data={areaData}
            index="mes"
            categories={['ventas', 'marketing', 'operaciones']}
            colors={['indigo', 'cyan', 'emerald']}
          />
        </CardBase>

        <CardBase
          title="Alcance"
          progressText="Registro proyecto"
          buttonTex="Ver detalle"
          route="/SuperAdmin/alcance"
        >
          <DonutChart data={donutData} category="value" dataKey="name" />
        </CardBase>

        <CardBase
          title="CREAR REGISTRO"
          progressText="Registro de proyecto"
          buttonTex="Ver detalle"
          route="/SuperAdmin/registrocompleto"
        >
          <AreaChart
            data={areaData}
            index="mes"
            categories={['ventas', 'marketing', 'operaciones']}
            colors={['indigo', 'cyan', 'emerald']}
          />
        </CardBase>
      </Grid>
    </div>
  );
}

export default Dashboard;
