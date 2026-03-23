import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import { IncomeService } from '../../../services/incomeService';
import type { CreateIncomePayload, UpdateIncomePayload } from '../../../types/Income';

export const useIncome = () => {
  //const dispatch = useDispatch();
  const { incomes, loading, error } = useSelector((state: RootState) => state.income);

  const fetchIncomes = async () => {
    try {
      const data = await IncomeService.getIncomes();
      // Dispatch action to update store
      return data;
    } catch (error) {
      console.error('Error fetching incomes:', error);
      throw error;
    }
  };

  const createIncome = async (income: CreateIncomePayload) => {
    try {
      const data = await IncomeService.createIncome(income);
      // Dispatch action to update store
      return data;
    } catch (error) {
      console.error('Error creating income:', error);
      throw error;
    }
  };

  const updateIncome = async (id: string, income: UpdateIncomePayload) => {
    try {
      const data = await IncomeService.updateIncome(id, income);
      // Dispatch action to update store
      return data;
    } catch (error) {
      console.error('Error updating income:', error);
      throw error;
    }
  };

  const deleteIncome = async (id: string) => {
    try {
      await IncomeService.deleteIncome(id);
      // Dispatch action to update store
    } catch (error) {
      console.error('Error deleting income:', error);
      throw error;
    }
  };

  return {
    incomes,
    loading,
    error,
    fetchIncomes,
    createIncome,
    updateIncome,
    deleteIncome,
  };
}; 