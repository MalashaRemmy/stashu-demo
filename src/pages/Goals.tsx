import { useState } from 'react';
import GoalCard from '../components/goals/GoalCard';
import GoalForm from '../components/goals/GoalForm';
import ContributionForm from '../components/goals/ContributionForm';
// import Button from the correct location
import {Button}  from '../components/ui/Button';
// Define Goal type locally if not exported from '../../types'
export type Goal = {
  id: string;
  name: string;
  targetAmount: number;
  currentAmount: number;
  description: string;
  targetDate?: string;
};

export default function Goals() {
  const [goals, setGoals] = useState<Goal[]>([
    {
      id: '1',
      name: 'Emergency Fund',
      targetAmount: 1000,
      currentAmount: 450,
      description: 'For unexpected expenses',
      targetDate: '2023-12-31',
    },
    {
      id: '2',
      name: 'New Laptop',
      targetAmount: 1200,
      currentAmount: 300,
      description: 'MacBook Pro for school',
      targetDate: '2024-06-01',
    },
  ]);
  const [showForm, setShowForm] = useState(false);
  const [editingGoal, setEditingGoal] = useState<Goal | null>(null);
  const [contributingTo, setContributingTo] = useState<Goal | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (data: {
    name: string;
    targetAmount: number;
    currentAmount: number;
    targetDate?: string;
    description: string;
  }) => {
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      if (editingGoal) {
        // Update existing goal
        setGoals(goals.map(g => 
          g.id === editingGoal.id ? { ...g, ...data, id: g.id } : g
        ));
      } else {
        // Add new goal
        setGoals([...goals, { ...data, id: Date.now().toString() }]);
      }
      setShowForm(false);
      setEditingGoal(null);
      setIsSubmitting(false);
    }, 500);
  };

  const handleDelete = (id: string) => {
    setGoals(goals.filter(g => g.id !== id));
  };

  const handleContribute = (goal: Goal, amount: number) => {
    setGoals(goals.map(g => 
      g.id === goal.id 
        ? { ...g, currentAmount: g.currentAmount + amount } 
        : g
    ));
    setContributingTo(null);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-blue-800">Financial Goals</h1>
        <Button onClick={() => {
          setEditingGoal(null);
          setShowForm(true);
        }}>
          Create Goal
        </Button>
      </div>

      {showForm && (
        <GoalForm
          initialData={editingGoal ? {
            name: editingGoal.name,
            targetAmount: editingGoal.targetAmount.toString(),
            currentAmount: editingGoal.currentAmount.toString(),
            targetDate: editingGoal.targetDate,
            description: editingGoal.description,
          } : undefined}
          onSubmit={handleSubmit}
          onCancel={() => {
            setShowForm(false);
            setEditingGoal(null);
          }}
          isLoading={isSubmitting}
        />
      )}

      {contributingTo && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <ContributionForm
            goal={contributingTo}
            onSubmit={(amount) => handleContribute(contributingTo, amount)}
            onCancel={() => setContributingTo(null)}
          />
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {goals.length === 0 ? (
          <div className="col-span-full text-center py-8">
            <p className="text-gray-500">No goals created yet</p>
            <Button 
              onClick={() => setShowForm(true)}
              className="mt-4"
            >
              Create Your First Goal
            </Button>
          </div>
        ) : (
          goals.map(goal => (
            <GoalCard
              key={goal.id}
              goal={goal}
              onEdit={() => {
                setEditingGoal(goal);
                setShowForm(true);
              }}
              onDelete={() => handleDelete(goal.id)}
              onContribute={() => setContributingTo(goal)}
            />
          ))
        )}
      </div>
    </div>
  );
}