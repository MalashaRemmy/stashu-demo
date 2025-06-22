import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface IncomeExpenseChartProps {
  data: {
    month: string;
    income: number;
    expenses: number;
  }[];
}

export default function IncomeExpenseChart({ data }: IncomeExpenseChartProps) {
  return (
    <div className="h-80">
      <h3 className="text-lg font-semibold mb-2 text-blue-800">Income vs Expenses</h3>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data}>
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip 
            formatter={(value: number) => [`$${value.toFixed(2)}`, '']}
            labelFormatter={(label) => `Month: ${label}`}
          />
          <Legend />
          <Bar dataKey="income" fill="#4f46e5" name="Income" />
          <Bar dataKey="expenses" fill="#f59e0b" name="Expenses" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}