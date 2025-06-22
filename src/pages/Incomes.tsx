import { useState } from 'react';
import IncomeForm from '../components/incomes/IncomeForm';
import IncomeList from '../components/incomes/IncomeList';
// Correct the import path for Button
import {Button} from '../components/ui/Button';
// import { Income } from './types';

export default function Incomes() {
  const [incomes, setIncomes] = useState<Income[]>([
    {
      id: '1',
      amount: 500,
      source: 'Part-time Job',
      frequency: 'monthly',
      date: '2023-05-01',
      description: 'Campus bookstore'
    },
    {
      id: '2',
      amount: 1000,
      source: 'Parents',
      frequency: 'monthly',
      date: '2023-05-05',
      description: 'Monthly allowance'
    }
  ]);
  const [showForm, setShowForm] = useState(false);
  const [editingIncome, setEditingIncome] = useState<Income | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (data: {
    amount: number;
    source: string;
    description: string;
    date: string;
    frequency: string;
  }) => {
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      if (editingIncome) {
        // Update existing income
        setIncomes(incomes.map(inc => 
          inc.id === editingIncome.id ? { ...inc, ...data, id: inc.id } : inc
        ));
      } else {
        // Add new income
        setIncomes([...incomes, { ...data, id: Date.now().toString() }]);
      }
      setShowForm(false);
      setEditingIncome(null);
      setIsSubmitting(false);
    }, 500);
  };

  const handleDelete = (id: string) => {
    setIncomes(incomes.filter(inc => inc.id !== id));
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-blue-800">Income</h1>
        <Button onClick={() => {
          setEditingIncome(null);
          setShowForm(true);
        }}>
          Add Income
        </Button>
      </div>

      {showForm && (
        <IncomeForm
          initialData={editingIncome ? {
            amount: editingIncome.amount.toString(),
            source: editingIncome.source,
            description: editingIncome.description || '',
            date: editingIncome.date,
            frequency: editingIncome.frequency,
          } : undefined}
          onSubmit={handleSubmit}
          onCancel={() => {
            setShowForm(false);
            setEditingIncome(null);
          }}
          isLoading={isSubmitting}
        />
      )}

      <IncomeList
        incomes={incomes}
        onEdit={(income) => {
          setEditingIncome(income);
          setShowForm(true);
        }}
        onDelete={handleDelete}
      />
    </div>
  );
}

// Add your type definitions here

export interface Income {
  id: string;
  amount: number;
  source: string;
  frequency: string;
  date: string;
  description?: string;
}