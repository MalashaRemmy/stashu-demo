// Expense Category Type
export type ExpenseCategory =
  | 'Food'
  | 'Housing'
  | 'Transportation'
  | 'Utilities'
  | 'Healthcare'
  | 'Education'
  | 'Entertainment'
  | 'Personal'
  | 'Subscriptions'
  | 'Other';

// Expense Frequency Type
export type ExpenseFrequency =
  | 'one-time'
  | 'daily'
  | 'weekly'
  | 'bi-weekly'
  | 'monthly'
  | 'quarterly'
  | 'yearly';

// Base Expense Interface
export interface BaseExpense {
  amount: number;
  category: ExpenseCategory;
  description?: string;
  date: string | Date;
  frequency: ExpenseFrequency;
  isRecurring: boolean;
  tags?: string[];
}

// Expense Interface (extends BaseExpense and adds id)
export interface Expense extends BaseExpense {
  id: string;
  userId: string;
  createdAt?: string | Date;
  updatedAt?: string | Date;
}

// Expense Create Payload (for creating new expenses)
export interface CreateExpensePayload extends BaseExpense {
  userId: string;
}

// Expense Update Payload (for updating existing expenses)
export interface UpdateExpensePayload extends Partial<BaseExpense> {
  id: string;
  userId: string;
}

// Expense Summary by Category
export interface ExpenseByCategory {
  category: ExpenseCategory;
  total: number;
  percentage: number;
  count: number;
}

// Expense Summary by Period
export interface ExpenseByPeriod {
  period: string; // e.g., "2023-05" or "Week 22"
  total: number;
  count: number;
}

// Expense Filter Options
export interface ExpenseFilterOptions {
  startDate?: string | Date;
  endDate?: string | Date;
  minAmount?: number;
  maxAmount?: number;
  categories?: ExpenseCategory[];
  frequencies?: ExpenseFrequency[];
  tags?: string[];
}

// Expense Statistics
export interface ExpenseStatistics {
  totalSpent: number;
  averageMonthlySpending: number;
  largestExpense: Expense | null;
  mostFrequentCategory: ExpenseCategory | null;
  categoryBreakdown: ExpenseByCategory[];
  periodBreakdown: ExpenseByPeriod[];
}

// Recurring Expense Interface
export interface RecurringExpense {
  id: string;
  userId: string;
  baseExpense: BaseExpense;
  startDate: string | Date;
  endDate?: string | Date;
  occurrences?: number;
  lastProcessed?: string | Date;
}

// Utility Types
export type ExpenseFormValues = Omit<BaseExpense, 'date'> & {
  date: string; // For form handling
};

// API Response Types
export interface ExpenseApiResponse {
  success: boolean;
  data: Expense | Expense[] | ExpenseStatistics | null;
  error?: string;
  message?: string;
}