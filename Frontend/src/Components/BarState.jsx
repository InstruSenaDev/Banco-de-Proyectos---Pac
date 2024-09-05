import { Card, CategoryBar } from '@tremor/react';

export function BarState() {
  return (
    <>
      <Card className="mx-auto max-w-sm">
        <p className="text-tremor-default text-tremor-content dark:text-dark-tremor-content flex items-center justify-between">
          <span>Nivel de aprobacion</span>
          <span>72%</span>
        </p>
        <CategoryBar
          values={[30, 40, 30]}
          colors={[ 'rose', 'yellow', 'emerald',]}
          markerValue={62}
          className="mt-3"
        />
      </Card>
    </>
  );
}