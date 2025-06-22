export interface Income {
  id: string;
  amount: number;
  source: string;
  description?: string;
  frequency: 'one-time' | 'weekly' | 'monthly';
  date: string;
  userId?: string;
}

export * from '../services/authService';
export * from '../services/expenseService';
export * from '../services/goalService';
export * from '../services/incomeService';