import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/Card';
import { SummaryCards } from '../components/dashboard/SummaryCards';
import { SpendingByCategory } from '../components/dashboard/SpendingByCategory';
import { IncomeExpenseChart } from '../components/dashboard/IncomeExpenseChart';
import { ExpenseForm } from '../components/features/expenses/ExpenseForm';
import IncomeForm from '../components/features/incomes/IncomeForm';
import { TransactionList } from '../components/features/transactions/TransactionList';
import { useTransactions } from '../hooks/useTransactions';
import { useNotifications } from '../hooks/useNotifications';

const DashboardOverview: React.FC = () => {
  const {
    incomes,
    expenses,
    addIncome,
    addExpense,
    deleteIncome,
    deleteExpense,
    totalIncome,
    totalExpenses,
    balance,
    recentTransactions,
  } = useTransactions();

  const { generateSmartNotifications } = useNotifications();
  const [showIncomeForm, setShowIncomeForm] = useState(false);
  const [showExpenseForm, setShowExpenseForm] = useState(false);

  // Generate smart notifications based on financial data
  useEffect(() => {
    if (totalIncome > 0 || totalExpenses > 0) {
      generateSmartNotifications(totalIncome, totalExpenses, balance);
    }
  }, [totalIncome, totalExpenses, balance, generateSmartNotifications]);

  const handleAddIncome = (data: any) => {
    addIncome(data);
    setShowIncomeForm(false);
  };

  const handleAddExpense = (data: any) => {
    addExpense(data);
    setShowExpenseForm(false);
  };

  return (
    <div className="space-y-6">
      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <button
              onClick={() => setShowIncomeForm(!showIncomeForm)}
              className="w-full bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 transition-colors"
            >
              + Add Income
            </button>
            <button
              onClick={() => setShowExpenseForm(!showExpenseForm)}
              className="w-full bg-red-600 text-white py-2 px-4 rounded-md hover:bg-red-700 transition-colors"
            >
              - Add Expense
            </button>
          </CardContent>
        </Card>

        {/* Quick Add Forms */}
        {showIncomeForm && (
          <Card>
            <CardHeader>
              <CardTitle>Add New Income</CardTitle>
            </CardHeader>
            <CardContent>
              <IncomeForm 
                onSubmit={handleAddIncome}
                onCancel={() => setShowIncomeForm(false)}
              />
            </CardContent>
          </Card>
        )}

        {showExpenseForm && (
          <Card>
            <CardHeader>
              <CardTitle>Add New Expense</CardTitle>
            </CardHeader>
            <CardContent>
              <ExpenseForm 
                onSubmit={handleAddExpense}
                onCancel={() => setShowExpenseForm(false)}
              />
            </CardContent>
          </Card>
        )}
      </div>

      {/* Summary Cards */}
      <SummaryCards 
        totalIncome={totalIncome}
        totalExpenses={totalExpenses}
        balance={balance}
      />
      
      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Income vs Expenses</CardTitle>
          </CardHeader>
          <CardContent>
            <IncomeExpenseChart incomes={incomes} expenses={expenses} />
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Spending by Category</CardTitle>
          </CardHeader>
          <CardContent>
            <SpendingByCategory expenses={expenses} />
          </CardContent>
        </Card>
      </div>

      {/* Recent Transactions */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Transactions</CardTitle>
        </CardHeader>
        <CardContent>
          <TransactionList
            transactions={recentTransactions}
            onDeleteIncome={deleteIncome}
            onDeleteExpense={deleteExpense}
          />
        </CardContent>
      </Card>
    </div>
  );
};

export const Dashboard: React.FC = () => {
  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Financial Dashboard</h1>
          <p className="text-gray-600">Track your student finances in real-time</p>
        </div>
        <div className="text-right">
          <p className="text-sm text-gray-500">Welcome to</p>
          <p className="text-xl font-bold text-blue-600">StashU</p>
        </div>
      </div>
      
      <Routes>
        <Route index element={<DashboardOverview />} />
        {/* Add more dashboard sub-routes here */}
      </Routes>
    </div>
  );
};

export default Dashboard;