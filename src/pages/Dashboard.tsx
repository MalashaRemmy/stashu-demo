import { useEffect, useState } from 'react';
import SummaryCards from '../components/dashboard/SummaryCards';
import IncomeExpenseChart from '../components/dashboard/IncomeExpenseChart';
import SpendingByCategory from '../components/dashboard/SpendingByCategory';

export default function Dashboard() {
  const [loading, setLoading] = useState(true);
  type IncomeExpense = { month: string; income: number; expenses: number };
  type SpendingCategory = { name: string; value: number };
  type DashboardData = {
    totalIncome: number;
    totalExpenses: number;
    balance: number;
    savingsProgress: number;
    incomeExpenseData: IncomeExpense[];
    spendingByCategory: SpendingCategory[];
  };

  const [dashboardData, setDashboardData] = useState<DashboardData>({
    totalIncome: 0,
    totalExpenses: 0,
    balance: 0,
    savingsProgress: 0,
    incomeExpenseData: [],
    spendingByCategory: []
  });

  useEffect(() => {
    // TODO: Replace with actual API call
    const fetchData = async () => {
      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 800));
        
        // Mock data
        setDashboardData({
          totalIncome: 2450,
          totalExpenses: 1850,
          balance: 600,
          savingsProgress: 45,
          incomeExpenseData: [
            { month: 'Jan', income: 1200, expenses: 900 },
            { month: 'Feb', income: 1900, expenses: 1200 },
            { month: 'Mar', income: 1500, expenses: 1000 },
            { month: 'Apr', income: 1800, expenses: 1100 },
          ],
          spendingByCategory: [
            { name: 'Food', value: 600 },
            { name: 'Housing', value: 800 },
            { name: 'Transportation', value: 200 },
            { name: 'Entertainment', value: 150 },
            { name: 'Other', value: 100 },
          ]
        });
      } catch (error) {
        console.error('Failed to fetch dashboard data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-blue-800">Dashboard</h1>
      
      <SummaryCards
        totalIncome={dashboardData.totalIncome}
        totalExpenses={dashboardData.totalExpenses}
        balance={dashboardData.balance}
        savingsProgress={dashboardData.savingsProgress}
      />
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow">
          <IncomeExpenseChart data={dashboardData.incomeExpenseData} />
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <SpendingByCategory data={dashboardData.spendingByCategory} />
        </div>
      </div>
    </div>
  );
}