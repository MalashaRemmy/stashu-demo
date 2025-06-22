import { AuthState } from '../types/auth';
import { GoalStatus } from '../types/Goal';
import { IncomeState } from './Income';
// store.ts
import { configureStore } from '@reduxjs/toolkit';
// Update the path below if mealPlanSlice is located elsewhere, e.g. '../slices/mealPlanSlice'
import mealPlanReducer from '../components/store/mealPlanSlice';

export const store = configureStore({
  reducer: {
    mealPlan: mealPlanReducer, // Key must match slice `name`
  },
});
export interface RootState {
  auth: AuthState;
  expenses: ExpenseState;
  goals: GoalStatus;
  income: IncomeState;
}

export type AppDispatch = typeof store.dispatch;

// Add this export if ExpenseState is defined in this file
export type ExpenseState = object; // Use 'object' to represent any non-primitive object