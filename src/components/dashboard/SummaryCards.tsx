import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/Card';
import { formatCurrency } from '../../lib/utils';

interface SummaryData {
  totalIncome: number;
  totalExpenses: number;
  balance: number;
  savingsRate: number;
}

const mockSummaryData: SummaryData = {
  totalIncome: 2500,
  totalExpenses: 1800,
  balance: 700,
  savingsRate: 28, // percentage
};

export const SummaryCards: React.FC = () => {
  const { totalIncome, totalExpenses, balance, savingsRate } = mockSummaryData;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Income</CardTitle>
          <span className="text-green-600">↑</span>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-green-600">
            {formatCurrency(totalIncome)}
          </div>
          <p className="text-xs text-gray-600">This month</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Expenses</CardTitle>
          <span className="text-red-600">↓</span>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-red-600">
            {formatCurrency(totalExpenses)}
          </div>
          <p className="text-xs text-gray-600">This month</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Balance</CardTitle>
          <span className="text-blue-600">$</span>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-blue-600">
            {formatCurrency(balance)}
          </div>
          <p className="text-xs text-gray-600">Available</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Savings Rate</CardTitle>
          <span className="text-purple-600">%</span>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-purple-600">
            {savingsRate}%
          </div>
          <p className="text-xs text-gray-600">Of income</p>
        </CardContent>
      </Card>
    </div>
  );
};