import { useState } from 'react';
import { Button } from '../ui/Button';
import Input from '../ui/Input';
import Select from '../ui/Select';

const incomeSources = [
  'Part-time Job',
  'Scholarship',
  'Parents',
  'Grant',
  'Savings',
  'Other'
];

interface IncomeFormProps {
  initialData?: {
    amount: string;
    source: string;
    description: string;
    date: string;
    frequency: string;
  };
  onSubmit: (data: {
    amount: number;
    source: string;
    description: string;
    date: string;
    frequency: string;
  }) => void;
  onCancel?: () => void;
  isLoading?: boolean;
}

export default function IncomeForm({ 
  initialData, 
  onSubmit, 
  onCancel, 
  isLoading 
}: IncomeFormProps) {
  const [formData, setFormData] = useState({
    amount: initialData?.amount || '',
    source: initialData?.source || incomeSources[0],
    description: initialData?.description || '',
    date: initialData?.date || new Date().toISOString().split('T')[0],
    frequency: initialData?.frequency || 'one-time',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      amount: parseFloat(formData.amount),
      source: formData.source,
      description: formData.description,
      date: formData.date,
      frequency: formData.frequency,
    });
  };

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-xl font-semibold mb-4 text-blue-800">
        {initialData ? 'Edit Income' : 'Add Income'}
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          label="Amount"
          type="number"
          name="amount"
          value={formData.amount}
          onChange={handleChange}
          step="0.01"
          min="0.01"
          required
        />
        <Select
          label="Source"
          name="source"
          value={formData.source}
          onChange={handleChange}
          options={incomeSources.map(source => ({ value: source, label: source }))}
          required
        />
        <Select
          label="Frequency"
          name="frequency"
          value={formData.frequency}
          onChange={handleChange}
          options={[
            { value: 'one-time', label: 'One-time' },
            { value: 'weekly', label: 'Weekly' },
            { value: 'monthly', label: 'Monthly' },
          ]}
          required
        />
        <Input
          label="Date"
          type="date"
          name="date"
          value={formData.date}
          onChange={handleChange}
          required
        />
        <Input
          label="Description (optional)"
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Additional details about this income"
        />
        <div className="flex justify-end space-x-3">
          {onCancel && (
            <Button
              type="button"
              variant="outline"
              onClick={onCancel}
              disabled={isLoading}
            >
              Cancel
            </Button>
          )}
          <Button type="submit" disabled={isLoading}>
            {isLoading ? 'Saving...' : 'Save Income'}
          </Button>
        </div>
      </form>
    </div>
  );
}