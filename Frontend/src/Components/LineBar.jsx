import { CategoryBar } from '@tremor/react';

export function LineBar() {
  return (
    <>
 <div class=" w-[8000px]">
        <p className="text-tremor-default text-tremor-content dark:text-dark-tremor-content flex items-center justify-between">
          <span>Rating Product A</span>
          <span>62%</span>
        </p>
        <CategoryBar
          values={[40, 30, 20, 10]}
          colors={['emerald', 'yellow', 'orange', 'rose']}
          markerValue={62}
          className="mt-3"
        />
      </div>
    </>
  );
}