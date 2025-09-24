import { useState } from 'react';
import { Expense } from '../types/expense';
import { formatCurrency } from '../lib/utils/currencyFormatter';
import { formatDate } from '../lib/utils/dateUtils';
import { Button } from '../components/ui/Button';

// This file define the Exponses list component which displays a list of expenses 

interface ExpenseListProps {
  onEdit: (expense: Expense) => void;
}

type ExpenseStore = {
  expenses: Expense[];
  removeExpense: (id: string) => void;
};

const dummyExpenses: Expense[] = [];

const useExpenseStore = (): ExpenseStore => {
  const [expenses, setExpenses] = useState<Expense[]>(dummyExpenses);

  const removeExpense = (id: string) => {
    setExpenses((prev) => prev.filter((expense) => expense.id !== id));
  };

  return { expenses, removeExpense };
};

export const ExpenseList = ({ onEdit }: ExpenseListProps) => {
  const { expenses, removeExpense } = useExpenseStore();

  if (expenses.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-500">No expenses recorded yet</p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto mt-6">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Date
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Category
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Description
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Amount
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {expenses.map((expense) => (
            <tr key={expense.id}>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {formatDate(typeof expense.date === 'string' ? expense.date : expense.date.toISOString())}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                {expense.category}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {expense.description || '-'}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-red-600 font-medium">
                -{formatCurrency(expense.amount)}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                <div className="flex space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => onEdit(expense)}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => removeExpense(expense.id)}
                  >
                    Delete
                  </Button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};