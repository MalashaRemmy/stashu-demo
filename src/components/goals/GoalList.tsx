import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../store';

// Example Goal type
export interface Goal {
  id: string;
  title?: string;
  description?: string;
  currentAmount: number;
  targetAmount: number;
}

const GoalList = () => {
  const { goals, loading, error } = useSelector((state: RootState) => state.goals);

  if (loading) return <div>Loading goals...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">Savings Goals</h1>
      <div className="grid gap-4">
        {goals.map((goal) => (
          <div key={goal.id} className="bg-white p-4 rounded-lg shadow">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="font-semibold">{goal.name}</h3>
                <p className="text-sm text-gray-600">{goal.description}</p>
              </div>
              <div className="text-right">
                <p className="font-bold">
                  ${goal.currentAmount.toFixed(2)} / ${goal.targetAmount.toFixed(2)}
                </p>
                <div className="w-32 h-2 bg-gray-200 rounded-full mt-2">
                  <div
                    className="h-full bg-blue-500 rounded-full"
                    style={{ width: `${(goal.currentAmount / goal.targetAmount) * 100}%` }}
                  />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GoalList;