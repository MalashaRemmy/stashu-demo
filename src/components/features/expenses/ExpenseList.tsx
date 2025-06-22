import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../../store';
import { fetchExpenses } from '../../store/expenseSlice';
// import {Card} from '../ui';
import type { Expense } from '../../../types/expense';

const ExpenseList = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { expenses, loading, error } = useSelector((state: RootState) => state.expenses);

  useEffect(() => {
    dispatch(fetchExpenses());
  }, [dispatch]);

  if (loading) return <div>Loading expenses...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">Expenses</h1>
      <div className="grid gap-4">
        {expenses.map((expense: Expense) => (
          <Card key={expense.id}>
            <div className="flex justify-between items-center">
              <div>
                <h3 className="font-semibold">{expense.description}</h3>
                <p className="text-sm text-gray-600">{expense.category}</p>
              </div>
              <div className="text-right">
                <p className="font-bold">${expense.amount.toFixed(2)}</p>
                <p className="text-sm text-gray-600">
                  {new Date(expense.date).toLocaleDateString()}
                </p>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default ExpenseList;

type CardProps = {
  children: React.ReactNode;
  className?: string;
};

const Card: React.FC<CardProps> = ({ children, className = '' }) => (
  <div className={`bg-white rounded shadow p-4 ${className}`}>
    {children}
  </div>
);
