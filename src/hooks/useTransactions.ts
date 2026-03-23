import { useMemo, useState, useEffect } from 'react';

type Income = { id: string; amount: number; source: string; frequency: 'one-time' | 'weekly' | 'monthly'; date: string; description?: string };
type Expense = { id: string; amount: number; category: string; description: string; date: string };

const STORAGE_KEYS = {
  incomes: 'stashu_incomes',
  expenses: 'stashu_expenses'
};

export function useTransactions() {
  const [incomes, setIncomes] = useState<Income[]>([]);
  const [expenses, setExpenses] = useState<Expense[]>([]);

  // Load data from localStorage on mount
  useEffect(() => {
    const savedIncomes = localStorage.getItem(STORAGE_KEYS.incomes);
    const savedExpenses = localStorage.getItem(STORAGE_KEYS.expenses);
    
    if (savedIncomes) {
      try {
        setIncomes(JSON.parse(savedIncomes));
      } catch (error) {
        console.error('Error loading incomes from localStorage:', error);
      }
    }
    
    if (savedExpenses) {
      try {
        setExpenses(JSON.parse(savedExpenses));
      } catch (error) {
        console.error('Error loading expenses from localStorage:', error);
      }
    }
  }, []);

  // Save to localStorage whenever data changes
  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.incomes, JSON.stringify(incomes));
  }, [incomes]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.expenses, JSON.stringify(expenses));
  }, [expenses]);

  const addIncome = (data: any) => {
    const income: Income = { 
      id: Date.now().toString(), 
      ...data,
      date: data.date || new Date().toISOString().split('T')[0]
    } as Income;
    setIncomes(prev => [...prev, income]);
  };

  const addExpense = (data: any) => {
    const expense: Expense = { 
      id: Date.now().toString(), 
      ...data,
      date: data.date || new Date().toISOString().split('T')[0]
    } as Expense;
    setExpenses(prev => [...prev, expense]);
  };

  const deleteIncome = (id: string) => setIncomes(prev => prev.filter(i => i.id !== id));
  const deleteExpense = (id: string) => setExpenses(prev => prev.filter(e => e.id !== id));

  const updateIncome = (id: string, data: Partial<Income>) => {
    setIncomes(prev => prev.map(income => 
      income.id === id ? { ...income, ...data } : income
    ));
  };

  const updateExpense = (id: string, data: Partial<Expense>) => {
    setExpenses(prev => prev.map(expense => 
      expense.id === id ? { ...expense, ...data } : expense
    ));
  };

  const totalIncome = useMemo(() => incomes.reduce((sum, i) => sum + i.amount, 0), [incomes]);
  const totalExpenses = useMemo(() => expenses.reduce((sum, e) => sum + e.amount, 0), [expenses]);
  const balance = useMemo(() => totalIncome - totalExpenses, [totalIncome, totalExpenses]);
  
  const recentTransactions = useMemo(() => {
    const items = [
      ...incomes.map(i => ({ ...i, type: 'income' as const })),
      ...expenses.map(e => ({ ...e, type: 'expense' as const })),
    ];
    return items.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()).slice(0, 10);
  }, [incomes, expenses]);

  // Monthly breakdown
  const monthlyData = useMemo(() => {
    const months: { [key: string]: { income: number; expenses: number } } = {};
    
    incomes.forEach(income => {
      const month = new Date(income.date).toLocaleDateString('en-US', { year: 'numeric', month: 'short' });
      if (!months[month]) months[month] = { income: 0, expenses: 0 };
      months[month].income += income.amount;
    });
    
    expenses.forEach(expense => {
      const month = new Date(expense.date).toLocaleDateString('en-US', { year: 'numeric', month: 'short' });
      if (!months[month]) months[month] = { income: 0, expenses: 0 };
      months[month].expenses += expense.amount;
    });
    
    return Object.entries(months).map(([month, data]) => ({
      month,
      income: data.income,
      expenses: data.expenses,
      savings: data.income - data.expenses
    }));
  }, [incomes, expenses]);

  // Category breakdown
  const categoryData = useMemo(() => {
    const categories: { [key: string]: number } = {};
    expenses.forEach(expense => {
      categories[expense.category] = (categories[expense.category] || 0) + expense.amount;
    });
    return Object.entries(categories).map(([category, amount]) => ({
      category,
      amount
    }));
  }, [expenses]);

  return { 
    incomes, 
    expenses, 
    addIncome, 
    addExpense, 
    deleteIncome, 
    deleteExpense,
    updateIncome,
    updateExpense,
    totalIncome, 
    totalExpenses, 
    balance, 
    recentTransactions,
    monthlyData,
    categoryData
  };
}


