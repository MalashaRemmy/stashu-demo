import { useState } from 'react';
import {ExpenseForm} from '../components/features/expenses/ExpenseForm';
import ExpenseList from '../components/features/expenses/ExpenseList';
import { Button } from '../components/ui/Button';

// Define this type in a shared types file (types.ts) and import it instead
export type ExpenseCategory = 'Food' | 'Housing' | 'Transportation' | 'Other';

type Expense = {
  id: string;
  amount: number;
  category: ExpenseCategory;
  description: string;
  date: string;
};


export default function Expenses() {
  const [expenses, setExpenses] = useState<Expense[]>([
    { id: '1', amount: 25.50, category: 'Food', description: 'Lunch with friends', date: '2023-05-15' },
    { id: '2', amount: 120, category: 'Housing', description: 'Internet bill', date: '2023-05-10' },
    { id: '3', amount: 45, category: 'Transportation', description: 'Monthly bus pass', date: '2023-05-01' },
  ]);
  const [showForm, setShowForm] = useState(false);
  const [editingExpense, setEditingExpense] = useState<Expense | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (data: Omit<Expense, 'id'>) => {
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      if (editingExpense) {
        // Update existing expense
        setExpenses(expenses.map(exp => 
          exp.id === editingExpense.id ? { ...exp, ...data, id: exp.id } : exp
        ));
      } else {
        // Add new expense
        setExpenses([...expenses, { ...data, id: Date.now().toString() }]);
      }
      setShowForm(false);
      setEditingExpense(null);
      setIsSubmitting(false);
    }, 500);
  };

  const handleEdit = (expense: Expense) => {
    setEditingExpense(expense);
    setShowForm(true);
  };

  const handleDelete = (id: string) => {
    setExpenses(expenses.filter(exp => exp.id !== id));
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-blue-800">Expenses</h1>
        <Button onClick={() => {
          setEditingExpense(null);
          setShowForm(true);
        }}>
          Add Expense
        </Button>
      </div>

      {showForm && (
        <ExpenseForm
          initialData={
            editingExpense
              ? { ...editingExpense }
              : undefined
          }
          onSubmit={handleSubmit}
          isLoading={isSubmitting}
          onCancel={() => {
            setShowForm(false);
            setEditingExpense(null);
          }}
        />
      )}

      <ExpenseList
        expenses={expenses}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
    </div>
  );
}