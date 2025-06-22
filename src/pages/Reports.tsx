import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

interface Transaction {
  id: string;
  date: string;
  description: string;
  amount: number;
  category: 'Food' | 'Books' | 'Housing' | 'Other';
}

const Reports: React.FC = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [timeRange, setTimeRange] = useState<string>('30days'); // 30days, 6months, 12months

  // Mock data (replace with API call)
  useEffect(() => {
    const mockTransactions: Transaction[] = [
      { id: '1', date: '2023-10-01', description: 'Campus Dining', amount: 12.50, category: 'Food' },
      { id: '2', date: '2023-10-05', description: 'Textbook Purchase', amount: 85.00, category: 'Books' },
      { id: '3', date: '2023-10-10', description: 'Apartment Rent', amount: 750.00, category: 'Housing' },
    ];
    setTransactions(mockTransactions);
  }, []);

  // Group transactions by category for the chart
  const categorySpending = transactions.reduce((acc, tx) => {
    acc[tx.category] = (acc[tx.category] || 0) + tx.amount;
    return acc;
  }, {} as Record<string, number>);

  const chartData = Object.entries(categorySpending).map(([category, amount]) => ({
    category,
    amount,
  }));

  return (
    <div className="reports-container">
      <h2>Spending Reports</h2>
      
      {/* Time range filter */}
      <select 
        value={timeRange} 
        onChange={(e) => setTimeRange(e.target.value)}
        className="time-range-selector"
      >
        <option value="30days">Last 30 Days</option>
        <option value="6months">Last 6 Months</option>
        <option value="12months">Last 12 Months</option>
      </select>

      {/* Spending chart (using Recharts) */}
      <div className="chart-container">
        <BarChart width={500} height={300} data={chartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="category" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="amount" fill="#8884d8" name="Spending ($)" />
        </BarChart>
      </div>

      {/* Transaction history table */}
      <table className="transactions-table">
        <thead>
          <tr>
            <th>Date</th>
            <th>Description</th>
            <th>Amount</th>
            <th>Category</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((tx) => (
            <tr key={tx.id}>
              <td>{tx.date}</td>
              <td>{tx.description}</td>
              <td>${tx.amount.toFixed(2)}</td>
              <td>{tx.category}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Reports;