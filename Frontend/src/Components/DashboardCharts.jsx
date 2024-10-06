// Importación de los gráficos de tremor
import { AreaChart, BarChart, DonutChart, Title, Text } from "@tremor/react";

const DashboardCharts = ({ projectData, taskData }) => {
  // Formateador de números
  const valueFormatter = (number) => Intl.NumberFormat("us").format(number).toString();

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* AreaChart de Progreso */}
      <div className="bg-white p-6 rounded shadow">
        <Title>Progress Overview</Title>
        <AreaChart
          data={projectData}
          index="date"
          categories={["completed", "in progress", "on hold"]}
          type="stacked"
          colors={["blue", "cyan", "violet"]}
          valueFormatter={valueFormatter}
          className="h-64 mt-6"
        />
      </div>

      {/* BarChart de Tareas */}
      <div className="bg-white p-6 rounded shadow">
        <Title>Tasks by Status</Title>
        <BarChart
          data={taskData}
          index="date"
          categories={["completed", "in progress", "on hold"]}
          colors={["green", "yellow", "red"]}
          valueFormatter={valueFormatter}
          className="h-64 mt-6"
        />
      </div>

      {/* DonutChart de Componentes */}
      <div className="bg-white p-6 rounded shadow">
        <Title>Project Components</Title>
        <DonutChart
          data={[
            { name: "SolarCells", amount: 4890 },
            { name: "Glass", amount: 2103 },
            { name: "JunctionBox", amount: 2050 },
            { name: "Adhesive", amount: 1300 },
            { name: "BackSheet", amount: 1100 },
            { name: "Frame", amount: 700 },
            { name: "Encapsulant", amount: 200 },
          ]}
          category="name"
          value="amount"
          showLabel={true}
          valueFormatter={(number) => `$${Intl.NumberFormat("us").format(number).toString()}`}
          className="h-64 mt-6"
        />
      </div>
    </div>
  );
};

export default DashboardCharts;
