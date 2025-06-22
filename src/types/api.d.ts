interface ExpenseCreateDTO {
  amount: number;
  category: string;
  description?: string;
  date: string;
}

interface Expense extends ExpenseCreateDTO {
  id: string;
  createdAt: string;
  updatedAt: string;
  userId: string;
}

interface ApiError {
  message: string;
  statusCode: number;
  errors?: Record<string, string>;
}

interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
}