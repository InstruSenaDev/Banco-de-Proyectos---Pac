import { Card, Metric, Text, Flex, ProgressBar, Button } from '@tremor/react';

export function CardBase({title, metricValue, progressText, buttonTex}) {
  return (
    <Card className='max-w-sm 2xl:w-full 2xl:h-full md:w-44'>
      <Text>{title}</Text>
      <Metric>{metricValue}</Metric>
      <Flex className='mt-4'>
        <Text>{progressText}</Text>
        
        <Button className='bg-green-600 mt-4 md:w-16'>{buttonTex}</Button>
      </Flex>
      <ProgressBar value={20} color='transparent' className="hidden" />
    </Card>
  );

}