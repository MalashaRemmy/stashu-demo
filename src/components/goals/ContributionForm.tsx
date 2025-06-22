import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../ui/Button';
import Input from '../ui/Input';
import { Card } from '../ui/Card';

export function RegisterForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    setLoading(true);
    setError('');
    
    try {
      // TODO: Replace with actual API call
      // const response = await registerUser(formData);
      console.log('Registration attempt:', formData);
      navigate('/dashboard');
    } catch (err: unknown) {
      console.error('Registration error:', err);
      setError('Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="max-w-md w-full p-8">
      <h2 className="text-2xl font-bold text-center mb-6 text-blue-800">Create Account</h2>
      {error && <p className="text-red-500 mb-4 text-center">{error}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          label="Full Name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
        />
        <Input
          label="Email"
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <Input
          label="Password"
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          required
          minLength={6}
        />
        <Input
          label="Confirm Password"
          type="password"
          name="confirmPassword"
          value={formData.confirmPassword}
          onChange={handleChange}
          required
        />
        <Button type="submit" className="w-full" disabled={loading}>
          {loading ? 'Registering...' : 'Register'}
        </Button>
      </form>
      <div className="mt-4 text-center">
        <button 
          onClick={() => navigate('/login')}
          className="text-blue-600 hover:underline"
        >
          Already have an account? Login
        </button>
      </div>
    </Card>
  );
}

interface ContributionFormProps {
  goal: {
    name: string;
    currentAmount: number;
    targetAmount: number;
  };
  onSubmit: (amount: number) => void;
  onCancel: () => void;
}

export default function ContributionForm({ goal, onSubmit, onCancel }: ContributionFormProps) {
  const [amount, setAmount] = useState('');
  const remaining = goal.targetAmount - goal.currentAmount;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const numAmount = parseFloat(amount);
    if (!isNaN(numAmount) && numAmount > 0) {
      onSubmit(numAmount);
    }
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow">
      <h3 className="text-lg font-medium mb-2">Add to {goal.name}</h3>
      <p className="text-sm text-gray-600 mb-4">
        Current: {goal.currentAmount.toFixed(2)} | Remaining: {remaining.toFixed(2)}
      </p>
      <form onSubmit={handleSubmit} className="space-y-3">
        <Input
          type="number"
          value={amount}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setAmount(e.target.value)}
          placeholder="Enter amount"
          min="0.01"
          max={remaining.toFixed(2)}
          step="0.01"
          required
        />
        <div className="flex justify-end space-x-2">
          <Button
            type="button"
            variant="outline"
            onClick={onCancel}
          >
            Cancel
          </Button>
          <Button type="submit">
            Add
          </Button>
        </div>
      </form>
    </div>
  );
}