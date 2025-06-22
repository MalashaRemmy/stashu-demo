// File: components/CreatePlan.tsx
import React, { useState } from 'react';
import { Button } from '../components/ui/Button';

export function CreatePlan() {
  const [goal, setGoal] = useState('');
  const [amount, setAmount] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert(`Goal: ${goal}, Amount: ${amount}`);
    setGoal('');
    setAmount('');
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <input
        type="text"
        placeholder="Goal Description"
        className="w-full p-2 border rounded"
        value={goal}
        onChange={(e) => setGoal(e.target.value)}
      />
      <input
        type="number"
        placeholder="Target Amount"
        className="w-full p-2 border rounded"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />
      <Button type="submit">Save Plan</Button>
    </form>
  );
}