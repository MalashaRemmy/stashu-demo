import { useEffect, useCallback } from 'react';
import { Expense } from '../types/expense';
import { ExpenseService } from '../services/expenseService';

import { useState } from 'react';
import { ExpenseList } from './ExpenseList';

export const ExpensesPage = () => {
  const [editingExpense, setEditingExpense] = useState<Expense | null>(null);

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Expenses</h1>
      
      <ExpenseForm 
        expense={editingExpense}
        onClearEdit={() => setEditingExpense(null)}
      />
      
      <ExpenseList onEdit={setEditingExpense} />
    </div>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useExpenses() {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchExpenses = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await ExpenseService.getExpenses();
      setExpenses(data);
    } catch {
      setError('Failed to fetch expenses.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchExpenses();
  }, [fetchExpenses]);

  return {
    expenses,
    loading,
    error,
    refetch: fetchExpenses,
  };
}

export interface ExpenseFormProps {
  expense: Expense | null;
  onClearEdit: () => void;
}

export const ExpenseForm = ({ expense, onClearEdit }: ExpenseFormProps) => {
  // TODO: Replace with actual form implementation
  return (
    <div>
      <p>Expense Form Placeholder</p>
      {expense && <div>Editing: {expense.description}</div>}
      <button onClick={onClearEdit}>Clear Edit</button>
    </div>
  );
};
