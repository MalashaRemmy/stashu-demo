import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface IncomeState {
  incomes: Income[];
  loading: boolean;
  error: string | null;
}

const initialState: IncomeState = {
  incomes: [],
  loading: false,
  error: null,
};

const incomeSlice = createSlice({
  name: 'incomes',
  initialState,
  reducers: {
    fetchIncomesStart(state) {
      state.loading = true;
      state.error = null;
    },
    fetchIncomesSuccess(state, action: PayloadAction<Income[]>) {
      state.incomes = action.payload;
      state.loading = false;
    },
    fetchIncomesFailure(state, action: PayloadAction<string>) {
      state.error = action.payload;
      state.loading = false;
    },
    addIncomeStart(state) {
      state.loading = true;
      state.error = null;
    },
    addIncomeSuccess(state, action: PayloadAction<Income>) {
      state.incomes.push(action.payload);
      state.loading = false;
    },
    addIncomeFailure(state, action: PayloadAction<string>) {
      state.error = action.payload;
      state.loading = false;
    },
    updateIncomeStart(state) {
      state.loading = true;
      state.error = null;
    },
    updateIncomeSuccess(state, action: PayloadAction<Income>) {
      const index = state.incomes.findIndex((inc: Income) => inc.id === action.payload.id);
      if (index !== -1) {
        state.incomes[index] = action.payload;
      }
      state.loading = false;
    },
    updateIncomeFailure(state, action: PayloadAction<string>) {
      state.error = action.payload;
      state.loading = false;
    },
    deleteIncomeStart(state) {
      state.loading = true;
      state.error = null;
    },
    deleteIncomeSuccess(state, action: PayloadAction<string>) {
      state.incomes = state.incomes.filter((inc: Income) => inc.id !== action.payload);
      state.loading = false;
    },
    deleteIncomeFailure(state, action: PayloadAction<string>) {
      state.error = action.payload;
      state.loading = false;
    },
  },
});

export const {
  fetchIncomesStart,
  fetchIncomesSuccess,
  fetchIncomesFailure,
  addIncomeStart,
  addIncomeSuccess,
  addIncomeFailure,
  updateIncomeStart,
  updateIncomeSuccess,
  updateIncomeFailure,
  deleteIncomeStart,
  deleteIncomeSuccess,
  deleteIncomeFailure,
} = incomeSlice.actions;

export default incomeSlice.reducer;

export interface Income {
  id: string;
  // Add other relevant fields here, for example:
  amount: number;
  source: string;
  date: string;
}