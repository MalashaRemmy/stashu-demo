import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/Card';
import { FinancialChart } from '../components/FinancialChart';
import { SummaryCards } from '../components/dashboard/SummaryCards';
import { SpendingByCategory } from '../components/dashboard/SpendingByCategory';
import { IncomeExpenseChart } from '../components/dashboard/IncomeExpenseChart';

const DashboardOverview: React.FC = () => {
  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <SummaryCards />
      
      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Income vs Expenses</CardTitle>
          </CardHeader>
          <CardContent>
            <IncomeExpenseChart incomes={[]} expenses={[]} />
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Spending by Category</CardTitle>
          </CardHeader>
          <CardContent>
            <SpendingByCategory />
          </CardContent>
        </Card>
      </div>

      {/* Cash Flow Chart */}
      <Card>
        <CardHeader>
          <CardTitle>Cash Flow Trend</CardTitle>
        </CardHeader>
        <CardContent>
          <FinancialChart />
        </CardContent>
      </Card>
    </div>
  );
};

export const Dashboard: React.FC = () => {
  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900">Financial Dashboard</h1>
        <p className="text-gray-600">Welcome to your financial overview</p>
      </div>
      
      <Routes>
        <Route index element={<DashboardOverview />} />
        {/* Add more dashboard sub-routes here */}
      </Routes>
    </div>
  );
};

export default Dashboard;