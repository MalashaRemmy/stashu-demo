import { useState, useEffect } from 'react';

export interface Goal {
  id: string;
  title: string;
  description: string;
  targetAmount: number;
  currentAmount: number;
  deadline: string;
  category: 'emergency' | 'education' | 'travel' | 'gadgets' | 'other';
  priority: 'low' | 'medium' | 'high';
  status: 'active' | 'completed' | 'paused';
  createdAt: string;
  updatedAt: string;
}

const STORAGE_KEY = 'stashu_goals';

export function useGoals() {
  const [goals, setGoals] = useState<Goal[]>([]);

  // Load goals from localStorage
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        setGoals(JSON.parse(saved));
      } catch (error) {
        console.error('Error loading goals from localStorage:', error);
      }
    } else {
      // Initialize with sample goals
      const sampleGoals: Goal[] = [
        {
          id: '1',
          title: 'Emergency Fund',
          description: 'Build a 3-month emergency fund for unexpected expenses',
          targetAmount: 3000,
          currentAmount: 1200,
          deadline: '2024-12-31',
          category: 'emergency',
          priority: 'high',
          status: 'active',
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        },
        {
          id: '2',
          title: 'New Laptop',
          description: 'Save for a new MacBook for programming projects',
          targetAmount: 1500,
          currentAmount: 450,
          deadline: '2024-08-15',
          category: 'gadgets',
          priority: 'medium',
          status: 'active',
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        }
      ];
      setGoals(sampleGoals);
    }
  }, []);

  // Save goals to localStorage
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(goals));
  }, [goals]);

  const addGoal = (goalData: Omit<Goal, 'id' | 'currentAmount' | 'status' | 'createdAt' | 'updatedAt'>) => {
    const newGoal: Goal = {
      ...goalData,
      id: Date.now().toString(),
      currentAmount: 0,
      status: 'active',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    setGoals(prev => [...prev, newGoal]);
  };

  const updateGoal = (id: string, updates: Partial<Goal>) => {
    setGoals(prev => prev.map(goal => 
      goal.id === id 
        ? { ...goal, ...updates, updatedAt: new Date().toISOString() }
        : goal
    ));
  };

  const deleteGoal = (id: string) => {
    setGoals(prev => prev.filter(goal => goal.id !== id));
  };

  const addMoneyToGoal = (id: string, amount: number) => {
    setGoals(prev => prev.map(goal => {
      if (goal.id === id) {
        const newAmount = goal.currentAmount + amount;
        const newStatus = newAmount >= goal.targetAmount ? 'completed' : goal.status;
        return {
          ...goal,
          currentAmount: newAmount,
          status: newStatus,
          updatedAt: new Date().toISOString()
        };
      }
      return goal;
    }));
  };

  const toggleGoalStatus = (id: string) => {
    setGoals(prev => prev.map(goal => 
      goal.id === id 
        ? { 
            ...goal, 
            status: goal.status === 'active' ? 'paused' : 'active',
            updatedAt: new Date().toISOString()
          }
        : goal
    ));
  };

  // Computed values
  const totalSaved = goals.reduce((sum, goal) => sum + goal.currentAmount, 0);
  const totalTarget = goals.reduce((sum, goal) => sum + goal.targetAmount, 0);
  const completedGoals = goals.filter(goal => goal.status === 'completed').length;
  const activeGoals = goals.filter(goal => goal.status === 'active').length;
  const progressPercentage = totalTarget > 0 ? (totalSaved / totalTarget) * 100 : 0;

  return {
    goals,
    addGoal,
    updateGoal,
    deleteGoal,
    addMoneyToGoal,
    toggleGoalStatus,
    totalSaved,
    totalTarget,
    completedGoals,
    activeGoals,
    progressPercentage
  };
}
