import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import expenseReducer from './expenseSlice';
import goalReducer from './goalSlice';
import incomeReducer from './incomeSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    expenses: expenseReducer,
    goals: goalReducer,
    income: incomeReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['expenses/fetchAll/fulfilled'],
        ignoredActionPaths: ['payload.date', 'payload.createdAt', 'payload.updatedAt'],
        ignoredPaths: [
          'expenses.expenses.date',
          'expenses.expenses.createdAt',
          'expenses.expenses.updatedAt'
        ],
      },
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;