import type { Income, CreateIncomePayload, UpdateIncomePayload } from '../types/Income';

class IncomeService {
  private static baseUrl = '/api/income';

  static async getIncomes(): Promise<Income[]> {
    try {
      const response = await fetch(this.baseUrl);
      const data = await response.json();
      if (!data.success) throw new Error(data.error);
      return data.data;
    } catch (error) {
      console.error('Error fetching incomes:', error);
      throw error;
    }
  }

  static async createIncome(income: CreateIncomePayload): Promise<Income> {
    try {
      const response = await fetch(this.baseUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(income),
      });
      const data = await response.json();
      if (!data.success) throw new Error(data.error);
      return data.data;
    } catch (error) {
      console.error('Error creating income:', error);
      throw error;
    }
  }

  static async updateIncome(id: string, income: UpdateIncomePayload): Promise<Income> {
    try {
      const response = await fetch(`${this.baseUrl}/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(income),
      });
      const data = await response.json();
      if (!data.success) throw new Error(data.error);
      return data.data;
    } catch (error) {
      console.error('Error updating income:', error);
      throw error;
    }
  }

  static async deleteIncome(id: string): Promise<void> {
    try {
      const response = await fetch(`${this.baseUrl}/${id}`, {
        method: 'DELETE',
      });
      const data = await response.json();
      if (!data.success) throw new Error(data.error);
    } catch (error) {
      console.error('Error deleting income:', error);
      throw error;
    }
  }
}

export { IncomeService }; 