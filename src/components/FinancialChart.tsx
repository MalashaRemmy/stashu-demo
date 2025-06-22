// File: components/FinancialChart.tsx
import React from 'react';

import {
  LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer
} from 'recharts';

const data = [
  { name: 'Jan', income: 500, expenses: 300 },
  { name: 'Feb', income: 600, expenses: 350 },
  { name: 'Mar', income: 700, expenses: 400 },
];

export function FinancialChart() {
  return (
    <ResponsiveContainer width="100%" height={250}>
      <LineChart data={data}>
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Line type="monotone" dataKey="income" stroke="#34D399" />
        <Line type="monotone" dataKey="expenses" stroke="#F87171" />
      </LineChart>
    </ResponsiveContainer>
  );
}

