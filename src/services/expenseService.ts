import type { Expense, ExpenseFilterOptions, ExpenseApiResponse } from '../types/expense';

class ExpenseService {
  private static baseUrl = '/api/expenses';

  static async getExpenses(filters?: ExpenseFilterOptions): Promise<Expense[]> {
    try {
      const queryParams = new URLSearchParams();
      if (filters) {
        Object.entries(filters).forEach(([key, value]) => {
          if (value !== undefined) {
            if (Array.isArray(value)) {
              value.forEach(v => queryParams.append(key, v.toString()));
            } else {
              queryParams.append(key, value.toString());
            }
          }
        });
      }

      const response = await fetch(`${this.baseUrl}?${queryParams.toString()}`);
      const data: ExpenseApiResponse = await response.json();

      if (!data.success) {
        throw new Error(data.error || 'Failed to fetch expenses');
      }

      return data.data as Expense[];
    } catch (error) {
      console.error('Error fetching expenses:', error);
      throw error;
    }
  }

  static async createExpense(expense: Omit<Expense, 'id'>): Promise<Expense> {
    try {
      const response = await fetch(this.baseUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(expense),
      });

      const data: ExpenseApiResponse = await response.json();

      if (!data.success) {
        throw new Error(data.error || 'Failed to create expense');
      }

      return data.data as Expense;
    } catch (error) {
      console.error('Error creating expense:', error);
      throw error;
    }
  }

  static async updateExpense(id: string, expense: Partial<Expense>): Promise<Expense> {
    try {
      const response = await fetch(`${this.baseUrl}/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(expense),
      });

      const data: ExpenseApiResponse = await response.json();

      if (!data.success) {
        throw new Error(data.error || 'Failed to update expense');
      }

      return data.data as Expense;
    } catch (error) {
      console.error('Error updating expense:', error);
      throw error;
    }
  }

  static async deleteExpense(id: string): Promise<void> {
    try {
      const response = await fetch(`${this.baseUrl}/${id}`, {
        method: 'DELETE',
      });

      const data: ExpenseApiResponse = await response.json();

      if (!data.success) {
        throw new Error(data.error || 'Failed to delete expense');
      }
    } catch (error) {
      console.error('Error deleting expense:', error);
      throw error;
    }
  }
}

export { ExpenseService }; 