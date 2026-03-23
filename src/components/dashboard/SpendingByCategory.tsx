import React from 'react';
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  Legend,
} from 'recharts';
import { formatCurrency } from '../../lib/utils';

const data = [
  { name: 'Food', value: 400, color: '#8884d8' },
  { name: 'Accommodation', value: 600, color: '#82ca9d' },
  { name: 'Transportation', value: 200, color: '#ffc658' },
  { name: 'Entertainment', value: 150, color: '#ff8042' },
  { name: 'Education', value: 300, color: '#0088fe' },
  { name: 'Other', value: 150, color: '#ffbb28' },
];

interface SpendingByCategoryProps {
  expenses?: any[];
}

export const SpendingByCategory: React.FC<SpendingByCategoryProps> = ({ expenses: _expenses = [] }) => {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <PieChart>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          labelLine={false}
          label={({ name, percent }) => `${name} (${(percent * 100).toFixed(0)}%)`}
          outerRadius={80}
          fill="#8884d8"
          dataKey="value"
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={entry.color} />
          ))}
        </Pie>
        <Tooltip formatter={(value: number) => [formatCurrency(value), 'Amount']} />
        <Legend />
      </PieChart>
    </ResponsiveContainer>
  );
};