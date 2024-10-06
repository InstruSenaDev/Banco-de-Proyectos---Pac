import { BarChart } from '@tremor/react';

const BarChartExample = () => {
  const data = [
    { category: 'Completed', value: 47 },
    { category: 'In Progress', value: 83 },
    { category: 'On Hold', value: 67 }
  ];

  return (
    <BarChart
      data={data}
      index="category"
      categories={['value']}
      colors={['blue']}
      valueFormatter={(number) => Intl.NumberFormat('us').format(number)}
      yAxisWidth={40}
    />
  );
};

export default BarChartExample;
