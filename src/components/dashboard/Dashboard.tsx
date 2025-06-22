import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../store';
//import { FinancialChart } from '../FinancialChart';
//import { ExpenseSummary } from '../expenses/ExpenseSummary';
//import { GoalProgress } from '../goals/GoalProgress';
//import { IncomeOverview } from '../incomes/IncomeOverview';

const Dashboard = () => {
  const { user } = useSelector((state: RootState) => state.auth);

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Welcome{user ? `, ${user.name}` : ''}!</h1>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/*<ExpenseSummary />
        <IncomeOverview />
        <FinancialChart />
        < GoalProgress /> */}
      </div>
    </div>
  );
};

export default Dashboard; 