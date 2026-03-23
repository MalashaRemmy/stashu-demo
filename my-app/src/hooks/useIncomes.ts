import { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store';
import { 
  fetchIncomesStart, 
  fetchIncomesSuccess, 
  fetchIncomesFailure,
  addIncomeSuccess,
  updateIncomeSuccess,
  deleteIncomeSuccess,
} from '../../store/incomeSlice';
export interface Income {
  id: string;
  amount: number;
  source: string;
  frequency: string;
  date: string;
  description?: string;
}

export const useIncomes = () => {
  const dispatch = useDispatch();
  const { incomes, loading, error } = useSelector((state: RootState) => state.income);

  const fetchIncomes = useCallback(async () => {
    dispatch(fetchIncomesStart());
    try {
      // TODO: Replace with actual API call
      // const response = await api.get('/incomes');
      const mockIncomes: Income[] = [
        {
          id: '1',
          amount: 500,
          source: 'Part-time Job',
          frequency: 'monthly',
          date: new Date().toISOString(),
          description: 'Campus bookstore'
        },
        {
          id: '2',
          amount: 1000,
          source: 'Parents',
          frequency: 'monthly',
          date: new Date().toISOString(),
          description: 'Monthly allowance'
        }
      ];
      dispatch(fetchIncomesSuccess(mockIncomes));
    } catch (err) {
      console.error('Failed to fetch incomes:', err);
      dispatch(fetchIncomesFailure('Failed to fetch incomes'));
    }
  }, [dispatch]);

  const addIncome = async (income: Omit<Income, 'id'>) => {
    try {
      // TODO: Replace with actual API call
      // const response = await api.post('/incomes', income);
      const newIncome: Income = {
        ...income,
        id: Date.now().toString(),
      };
      dispatch(addIncomeSuccess(newIncome));
      return newIncome;
    } catch (err) {
      console.error('Failed to add income:', err);
      throw err;
    }
  };

  const updateIncome = async (id: string, income: Partial<Income>) => {
    try {
      // TODO: Replace with actual API call
      // const response = await api.put(`/incomes/${id}`, income);
      const updatedIncome = {
        ...incomes.find(inc => inc.id === id),
        ...income,
      } as Income;
      dispatch(updateIncomeSuccess(updatedIncome));
      return updatedIncome;
    } catch (err) {
      console.error('Failed to update income:', err);
      throw err;
    }
  };

  const deleteIncome = async (id: string) => {
    try {
      // TODO: Replace with actual API call
      // await api.delete(`/incomes/${id}`);
      dispatch(deleteIncomeSuccess(id));
    } catch (err) {
      console.error('Failed to delete income:', err);
      throw err;
    }
  };

  useEffect(() => {
    fetchIncomes();
  }, [fetchIncomes]);

  return {
    incomes,
    loading,
    error,
    addIncome,
    updateIncome,
    deleteIncome,
    refetch: fetchIncomes,
  };
};

export interface Income {
  id: string;
  amount: number;
  source: string;
  frequency: string;
  date: string;
  description?: string;
}