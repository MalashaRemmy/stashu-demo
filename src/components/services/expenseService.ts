import {
  CreateExpensePayload,
  Expense,
  UpdateExpensePayload,
  ExpenseFilterOptions
} from '../../types/expense';

const API_BASE = import.meta.env.VITE_API_BASE || 'http://localhost:3000/api';

export const ExpenseService = {
  async getExpenses(filters?: ExpenseFilterOptions): Promise<Expense[]> {
    const query = filters ? `?${new URLSearchParams(filters as Record<string, string>)}` : '';
    const response = await fetch(`${API_BASE}/expenses${query}`, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    });
    if (!response.ok) throw new Error('Failed to fetch expenses');
    return response.json();
  },

  async createExpense(payload: CreateExpensePayload): Promise<Expense> {
    const response = await fetch(`${API_BASE}/expenses`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      },
      body: JSON.stringify(payload)
    });
    if (!response.ok) throw new Error('Failed to create expense');
    return response.json();
  },

  async updateExpense(payload: UpdateExpensePayload): Promise<Expense> {
    const response = await fetch(`${API_BASE}/expenses/${payload.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      },
      body: JSON.stringify(payload)
    });
    if (!response.ok) throw new Error('Failed to update expense');
    return response.json();
  },

  async deleteExpense(id: string): Promise<void> {
    const response = await fetch(`${API_BASE}/expenses/${id}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    });
    if (!response.ok) throw new Error('Failed to delete expense');
  }
};