import React from 'react';
import { AreaChart as RechartsAreaChart, Area, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from 'recharts';

const AreaChart = ({ data, index, categories, showLegend }) => {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <RechartsAreaChart data={data}>
        <XAxis dataKey={index} />
        <YAxis />
        <Tooltip />
        <CartesianGrid strokeDasharray="3 3" />
        {categories.map((category, index) => (
          <Area key={index} type="monotone" dataKey={category} fill={`url(#color${index})`} stroke={`#${Math.floor(Math.random()*16777215).toString(16)}`} />
        ))}
      </RechartsAreaChart>
    </ResponsiveContainer>
  );
};

export default AreaChart;
