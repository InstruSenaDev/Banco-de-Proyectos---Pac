import { AreaChart, LineChart } from '@tremor/react';

const ComboChartExample = () => {
  const data = [
    { date: 'Jun 1, 24', completed: 47, inProgress: 83, onHold: 67 },
    { date: 'Jun 2, 24', completed: 20, inProgress: 97, onHold: 12 },
    // More data here...
  ];

  return (
    <div>
      <AreaChart
        className="h-64"
        data={data}
        index="date"
        categories={['completed', 'inProgress', 'onHold']}
        colors={['blue', 'cyan', 'violet']}
        valueFormatter={(number) => Intl.NumberFormat('us').format(number)}
        yAxisWidth={35}
      />
      <LineChart
        className="h-64 mt-6"
        data={data}
        index="date"
        categories={['completed', 'inProgress', 'onHold']}
        colors={['blue', 'cyan', 'violet']}
        valueFormatter={(number) => Intl.NumberFormat('us').format(number)}
      />
    </div>
  );
};

export default ComboChartExample;
