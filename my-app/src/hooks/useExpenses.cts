import { useEffect } from 'react';
import { useDispatch, useSelector, TypedUseSelectorHook } from 'react-redux';
import type { RootState, AppDispatch } from '../../store'; // adjust the path as needed
import { fetchExpenses } from '../../store/expenseSlice';
import { ExpenseFilterOptions } from '../../../types/expense';

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export const useExpenses = (filters?: ExpenseFilterOptions) => {
  const dispatch = useAppDispatch();
  const { expenses, loading, error } = useAppSelector((state: { expenses: { expenses: any[]; loading: boolean; error: any } }) => state.expenses);

  const refetch = () => {
    return dispatch(fetchExpenses(filters));
  };

  useEffect(() => {
    refetch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, JSON.stringify(filters)]);

  return {
    expenses,
    loading,
    error,
    refetch
  };
};