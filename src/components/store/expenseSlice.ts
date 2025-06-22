import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import type { Expense, ExpenseFilterOptions } from '../../types/expense';
import { ExpenseService } from '../../services/expenseService';

interface ExpenseState {
  expenses: Expense[];
  loading: boolean;
  error: string | null;
}

const initialState: ExpenseState = {
  expenses: [],
  loading: false,
  error: null
};

const expenseSlice = createSlice({
  name: 'expenses',
  initialState,
  reducers: {
    clearExpenses(state) {
      state.expenses = [];
      state.error = null;
    },
    setError(state, action: PayloadAction<string>) {
      state.error = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchExpenses.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchExpenses.fulfilled, (state, action: PayloadAction<Expense[]>) => {
        state.expenses = action.payload;
        state.loading = false;
      })
      .addCase(fetchExpenses.rejected, (state, action) => {
        state.error = action.error.message || 'Failed to fetch expenses';
        state.loading = false;
      });
  }
});

export const fetchExpenses = createAsyncThunk(
  'expenses/fetchAll',
  async (filters?: ExpenseFilterOptions) => {
    return await ExpenseService.getExpenses(filters);
  }
);

export const { clearExpenses, setError } = expenseSlice.actions;
export default expenseSlice.reducer;