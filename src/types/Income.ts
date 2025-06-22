export type IncomeSource = 'salary' | 'freelance' | 'investments' | 'other';

export interface Income {
  id: string;
  userId: string;
  amount: number;
  source: IncomeSource;
  description?: string;
  date: string | Date;
  isRecurring: boolean;
  frequency?: 'weekly' | 'bi-weekly' | 'monthly' | 'quarterly' | 'yearly';
  createdAt: string | Date;
  updatedAt: string | Date;
}

export interface CreateIncomePayload {
  amount: number;
  source: IncomeSource;
  description?: string;
  date: string | Date;
  isRecurring: boolean;
  frequency?: Income['frequency'];
}

export interface UpdateIncomePayload extends Partial<CreateIncomePayload> {
  id: string;
}

export interface IncomeState {
  incomes: Income[];
  loading: boolean;
  error: string | null;
} 