"use client";

import { BarChart } from "@tremor/react";

// Formateador de números
const dataFormatter = (number) =>
  Intl.NumberFormat("us").format(number).toString();

export function BarChartGroupExample({ data }) {
  return (
    <BarChart
      data={data}
      index="name" // Campo que representa los meses
      categories={[
        "Usuarios",
        "Proyectos",
      ]} // Todas las categorías que aparecerán en el gráfico
      valueFormatter={dataFormatter} // Formato para los valores
      yAxisWidth={48} // Ancho del eje Y
    />
  );
}
