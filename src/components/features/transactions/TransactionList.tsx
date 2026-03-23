import React from 'react';
import type { Income, Expense } from '../../../types';
import { formatCurrency, formatDate } from '../../../lib/utils';

interface TransactionListProps {
  transactions?: any[];
  onDeleteIncome?: (id: string) => void;
  onDeleteExpense?: (id: string) => void;
}

export const TransactionList: React.FC<TransactionListProps> = ({
  transactions = [],
  onDeleteIncome = () => {},
  onDeleteExpense = () => {},
}) => {
  const isIncome = (transaction: Income | Expense): transaction is Income => {
    return 'source' in transaction;
  };

  const getCategoryColor = (category: string) => {
    const colors: Record<string, string> = {
      food: 'bg-orange-100 text-orange-800',
      accommodation: 'bg-blue-100 text-blue-800',
      transportation: 'bg-purple-100 text-purple-800',
      entertainment: 'bg-pink-100 text-pink-800',
      education: 'bg-green-100 text-green-800',
      healthcare: 'bg-red-100 text-red-800',
      other: 'bg-gray-100 text-gray-800',
    };
    return colors[category] || colors.other;
  };

  if (transactions.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-500">No transactions yet</p>
        <p className="text-sm text-gray-400 mt-1">Add your first income or expense to get started</p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {transactions.map((transaction) => (
        <div
          key={transaction.id}
          className="flex items-center justify-between p-4 bg-white border border-gray-200 rounded-lg hover:shadow-sm transition-shadow"
        >
          <div className="flex items-center space-x-4">
            <div
              className={`w-10 h-10 rounded-full flex items-center justify-center ${
                isIncome(transaction)
                  ? 'bg-green-100 text-green-600'
                  : 'bg-red-100 text-red-600'
              }`}
            >
              {isIncome(transaction) ? '↑' : '↓'}
            </div>
            
            <div>
              <p className="font-medium text-gray-900">
                {isIncome(transaction) ? transaction.source : transaction.description}
              </p>
              <div className="flex items-center space-x-2 mt-1">
                <p className="text-sm text-gray-500">
                  {formatDate(transaction.date)}
                </p>
                {!isIncome(transaction) && (
                  <span
                    className={`text-xs px-2 py-1 rounded-full ${getCategoryColor(
                      transaction.category
                    )}`}
                  >
                    {transaction.category}
                  </span>
                )}
                {isIncome(transaction) && transaction.frequency !== 'one-time' && (
                  <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
                    {transaction.frequency}
                  </span>
                )}
              </div>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <p
              className={`font-semibold ${
                isIncome(transaction) ? 'text-green-600' : 'text-red-600'
              }`}
            >
              {isIncome(transaction) ? '+' : '-'}
              {formatCurrency(transaction.amount)}
            </p>
            
            <button
              onClick={() =>
                isIncome(transaction)
                  ? onDeleteIncome?.(transaction.id)
                  : onDeleteExpense?.(transaction.id)
              }
              className="text-gray-400 hover:text-red-500 transition-colors p-1 hover:bg-red-50 rounded"
              title="Delete transaction"
            >
              🗑️
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};