import { DonutChart } from '@tremor/react';

const datahero = [
  { name: 'Noche Holding AG', value: 9800 },
  { name: 'Rain Drop AG', value: 4567 },
  { name: 'Push Rail AG', value: 3908 },
  { name: 'Flow Steal AG', value: 2400 },
  { name: 'Tiny Loop Inc.', value: 2174 },
  { name: 'Anton Resorts Holding', value: 1398 },
];

const dataFormatter = (number) => `$ ${Intl.NumberFormat('us').format(number)}`;

export const ChartDonut = () => {
  return (
    <div className="mx-auto space-y-12">
      {/* Donut Chart */}
      <div className="space-y-3">
        <span className="text-center block font-mono text-tremor-default text-tremor-content dark:text-dark-tremor-content">
          Donut Variant
        </span>
        <div className="flex justify-center">
          <DonutChart
            data={datahero}
            variant="donut"
            valueFormatter={dataFormatter}
            onValueChange={(value) => console.log(value)}
          />
        </div>
      </div>
      {/* Pie Chart */}
      <div className="space-y-3">
        <span className="text-center block font-mono text-tremor-default text-tremor-content dark:text-dark-tremor-content">
          Pie Variant
        </span>
        <div className="flex justify-center">
          <DonutChart
            data={datahero}
            variant="pie"
            valueFormatter={dataFormatter}
            onValueChange={(value) => console.log(value)}
          />
        </div>
      </div>
    </div>
  );
};
