import { useState } from 'react';
import { Button, Input } from '../ui';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

interface GoalFormProps {
  initialData?: {
    name: string;
    targetAmount: string;
    currentAmount: string;
    targetDate?: string;
    description: string;
  };
  onSubmit: (data: {
    name: string;
    targetAmount: number;
    currentAmount: number;
    targetDate?: string;
    description: string;
  }) => void;
  onCancel?: () => void;
  isLoading?: boolean;
}

export default function GoalForm({ 
  initialData, 
  onSubmit, 
  onCancel, 
  isLoading 
}: GoalFormProps) {
  const [formData, setFormData] = useState({
    name: initialData?.name || '',
    targetAmount: initialData?.targetAmount || '',
    currentAmount: initialData?.currentAmount || '0',
    targetDate: initialData?.targetDate || '',
    description: initialData?.description || '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleDateChange = (date: Date | null) => {
    setFormData(prev => ({ 
      ...prev, 
      targetDate: date ? date.toISOString().split('T')[0] : '' 
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      name: formData.name,
      targetAmount: parseFloat(formData.targetAmount),
      currentAmount: parseFloat(formData.currentAmount),
      targetDate: formData.targetDate || undefined,
      description: formData.description,
    });
  };

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-xl font-semibold mb-4 text-blue-800">
        {initialData ? 'Edit Goal' : 'Create New Goal'}
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          label="Goal Name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
        />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            label="Target Amount"
            type="number"
            name="targetAmount"
            value={formData.targetAmount}
            onChange={handleChange}
            min="0.01"
            step="0.01"
            required
          />
          <Input
            label="Current Amount"
            type="number"
            name="currentAmount"
            value={formData.currentAmount}
            onChange={handleChange}
            min="0"
            step="0.01"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Target Date (optional)
          </label>
          <DatePicker
            selected={formData.targetDate ? new Date(formData.targetDate) : null}
            onChange={handleDateChange}
            minDate={new Date()}
            placeholderText="Select a target date"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Description (optional)
          </label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows={3}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
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
            {isLoading ? 'Saving...' : 'Save Goal'}
          </Button>
        </div>
      </form>
    </div>
  );
}