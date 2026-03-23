import { useState, useEffect } from 'react';
import { Income, Expense } from '../types';
import { generateId, formatCurrency } from '../lib/utils';

export const useTransactions = () => {
  const [incomes, setIncomes] = useState<Income[]>([]);
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [loading, setLoading] = useState(false);

  // Load from localStorage on mount
  useEffect(() => {
    const savedIncomes = localStorage.getItem('stashu_incomes');
    const savedExpenses = localStorage.getItem('stashu_expenses');
    
    if (savedIncomes) setIncomes(JSON.parse(savedIncomes));
    if (savedExpenses) setExpenses(JSON.parse(savedExpenses));
  }, []);

  // Save to localStorage whenever data changes
  useEffect(() => {
    localStorage.setItem('stashu_incomes', JSON.stringify(incomes));
    localStorage.setItem('stashu_expenses', JSON.stringify(expenses));
  }, [incomes, expenses]);

  const addIncome = (incomeData: Omit<Income, 'id' | 'userId' | 'createdAt' | 'updatedAt'>) => {
    const newIncome: Income = {
      ...incomeData,
      id: generateId(),
      userId: 'demo-user', // Will be replaced with actual user ID when auth is added
      date: new Date(incomeData.date),
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    
    setIncomes(prev => [newIncome, ...prev]);
    return newIncome;
  };

  const addExpense = (expenseData: Omit<Expense, 'id' | 'userId' | 'createdAt' | 'updatedAt'>) => {
    const newExpense: Expense = {
      ...expenseData,
      id: generateId(),
      userId: 'demo-user',
      date: new Date(expenseData.date),
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    
    setExpenses(prev => [newExpense, ...prev]);
    return newExpense;
  };

  const deleteIncome = (id: string) => {
    setIncomes(prev => prev.filter(income => income.id !== id));
  };

  const deleteExpense = (id: string) => {
    setExpenses(prev => prev.filter(expense => expense.id !== id));
  };

  // Calculate totals
  const totalIncome = incomes.reduce((sum, income) => sum + income.amount, 0);
  const totalExpenses = expenses.reduce((sum, expense) => sum + expense.amount, 0);
  const balance = totalIncome - totalExpenses;

  // Get recent transactions (combined and sorted)
  const recentTransactions = [...incomes, ...expenses]
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 10);

  return {
    incomes,
    expenses,
    loading,
    addIncome,
    addExpense,
    deleteIncome,
    deleteExpense,
    totalIncome,
    totalExpenses,
    balance,
    recentTransactions,
  };
};