import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8', '#4CAF50'];

interface SpendingByCategoryProps {
  data: {
    name: string;
    value: number;
  }[];
}

export default function SpendingByCategory({ data }: SpendingByCategoryProps) {
  return (
    <div className="h-80">
      <h3 className="text-lg font-semibold mb-2 text-blue-800">Spending by Category</h3>
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            labelLine={false}
            outerRadius={80}
            fill="#8884d8"
            dataKey="value"
            nameKey="name"
            label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip formatter={(value: number) => [`$${value.toFixed(2)}`, '']} />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}