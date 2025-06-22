import type { Goal, CreateGoalPayload, UpdateGoalPayload } from '../types/Goal';

class GoalService {
  private static baseUrl = '/api/goals';

  static async getGoals(): Promise<Goal[]> {
    try {
      const response = await fetch(this.baseUrl);
      const data = await response.json();
      if (!data.success) throw new Error(data.error);
      return data.data;
    } catch (error) {
      console.error('Error fetching goals:', error);
      throw error;
    }
  }

  static async createGoal(goal: CreateGoalPayload): Promise<Goal> {
    try {
      const response = await fetch(this.baseUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(goal),
      });
      const data = await response.json();
      if (!data.success) throw new Error(data.error);
      return data.data;
    } catch (error) {
      console.error('Error creating goal:', error);
      throw error;
    }
  }

  static async updateGoal(id: string, goal: UpdateGoalPayload): Promise<Goal> {
    try {
      const response = await fetch(`${this.baseUrl}/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(goal),
      });
      const data = await response.json();
      if (!data.success) throw new Error(data.error);
      return data.data;
    } catch (error) {
      console.error('Error updating goal:', error);
      throw error;
    }
  }

  static async deleteGoal(id: string): Promise<void> {
    try {
      const response = await fetch(`${this.baseUrl}/${id}`, {
        method: 'DELETE',
      });
      const data = await response.json();
      if (!data.success) throw new Error(data.error);
    } catch (error) {
      console.error('Error deleting goal:', error);
      throw error;
    }
  }
}

export { GoalService }; 