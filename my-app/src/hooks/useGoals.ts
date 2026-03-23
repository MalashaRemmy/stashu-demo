import { useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store';
import { 
  fetchGoalsStart, 
  fetchGoalsSuccess, 
  fetchGoalsFailure,
  addGoalSuccess,
  updateGoalSuccess,
  deleteGoalSuccess,
  contributeToGoalSuccess,
} from '../../store/goalSlice';
// Define Goal type here if not exported from '../../types'
export type Goal = {
  id: string;
  name: string;
  targetAmount: number;
  currentAmount: number;
  description: string;
  targetDate: string;
};
// import { Goal } from '../../types';

export const useGoals = () => {
  const dispatch = useDispatch();
  const { goals, loading, error } = useSelector((state: RootState) => state.goals);

  const fetchGoals = useCallback(async () => {
    dispatch(fetchGoalsStart());
    try {
      // TODO: Replace with actual API call
      // const response = await api.get('/goals');
      const mockGoals: Goal[] = [
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
      ];
      dispatch(fetchGoalsSuccess(mockGoals));
    } catch {
      dispatch(fetchGoalsFailure('Failed to fetch goals'));
    }
  }, [dispatch]);

  const addGoal = async (goal: Omit<Goal, 'id'>) => {
    try {
      // TODO: Replace with actual API call
      // const response = await api.post('/goals', goal);
      const newGoal: Goal = {
        ...goal,
        id: Date.now().toString(),
      };
      dispatch(addGoalSuccess(newGoal));
      return newGoal;
    } catch (err) {
      console.error('Failed to add goal:', err);
      throw err;
    }
  };

  const updateGoal = async (id: string, goal: Partial<Goal>) => {
    try {
      // TODO: Replace with actual API call
      // const response = await api.put(`/goals/${id}`, goal);
      const updatedGoal = {
        ...goals.find(g => g.id === id),
        ...goal,
      } as Goal;
      dispatch(updateGoalSuccess(updatedGoal));
      return updatedGoal;
    } catch (err) {
      console.error('Failed to update goal:', err);
      throw err;
    }
  };

  const deleteGoal = async (id: string) => {
    try {
      // TODO: Replace with actual API call
      // await api.delete(`/goals/${id}`);
      dispatch(deleteGoalSuccess(id));
    } catch (err) {
      console.error('Failed to delete goal:', err);
      throw err;
    }
  };

  const contributeToGoal = async (id: string, amount: number) => {
    try {
      // TODO: Replace with actual API call
      // await api.post(`/goals/${id}/contribute`, { amount });
      dispatch(contributeToGoalSuccess({ id, amount }));
    } catch (err) {
      console.error('Failed to contribute to goal:', err);
      throw err;
    }
  };

  useEffect(() => {
    fetchGoals();
  }, [fetchGoals]);

  return {
    goals,
    loading,
    error,
    addGoal,
    updateGoal,
    deleteGoal,
    contributeToGoal,
    refetch: fetchGoals,
  };
};