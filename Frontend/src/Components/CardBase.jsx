import { Card, Metric, Text, Flex, ProgressBar } from '@tremor/react';

export function CardBase({title, metricValue, progressText, additionalText}) {
  return (
    <Card className='max-w-sm'>
      <Text>{title}</Text>
      <Metric>{metricValue}</Metric>
      <Flex className='mt-4'>
        <Text>{progressText}</Text>
        <Text>{additionalText}</Text>
      </Flex>
      <ProgressBar value={50} className="mt-2" />
    </Card>
  );

}