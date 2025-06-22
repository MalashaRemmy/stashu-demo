// Update the import path to where Button is actually exported from
import { Button } from '../ui/Button';
import { formatCurrency, } from '../../lib/utils/currencyFormatter';
import { formatDate } from '../../lib/utils/dateUtils';

interface IncomeListProps {
  incomes: Income[];
  onEdit: (income: Income) => void;
  onDelete: (id: string) => void;
}

export default function IncomeList({ incomes, onEdit, onDelete }: IncomeListProps) {
  if (incomes.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-500">No income records yet</p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Source</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Frequency</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {incomes.map((income) => (
            <tr key={income.id}>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {formatDate(income.date)}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                {income.source}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {income.frequency}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-green-600 font-medium">
                {formatCurrency(income.amount)}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {income.description || '-'}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                <div className="space-x-2">
                  <Button 
                    variant="outline" 
                    onClick={() => onEdit(income)}
                  >
                    Edit
                  </Button>
                  <Button 
                    variant="default" 
                    onClick={() => onDelete(income.id)}
                  >
                    Delete
                  </Button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

// Utility function to format currency
// Utility functions moved to utils/format.ts

export interface Income {
  id: string;
  date: string;
  source: string;
  frequency: string;
  amount: number;
  description?: string;
}