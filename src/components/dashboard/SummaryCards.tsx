// Simple Card component as a fallback if not available from another module
const Card: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({ children, className = '', ...props }) => (
  <div className={`rounded-lg shadow border ${className}`} {...props}>
    {children}
  </div>
);

interface SummaryCardsProps {
  totalIncome: number;
  totalExpenses: number;
  balance: number;
  savingsProgress: number;
}

export default function SummaryCards({ 
  totalIncome, 
  totalExpenses, 
  balance,
  savingsProgress 
}: SummaryCardsProps) {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      <Card className="p-4 bg-blue-50 border-blue-200">
        <h3 className="text-sm font-medium text-blue-800">Total Income</h3>
        <p className="text-2xl font-bold text-blue-600">{formatCurrency(totalIncome)}</p>
      </Card>
      <Card className="p-4 bg-amber-50 border-amber-200">
        <h3 className="text-sm font-medium text-amber-800">Total Expenses</h3>
        <p className="text-2xl font-bold text-amber-600">{formatCurrency(totalExpenses)}</p>
      </Card>
      <Card className="p-4 bg-green-50 border-green-200">
        <h3 className="text-sm font-medium text-green-800">Current Balance</h3>
        <p className="text-2xl font-bold text-green-600">{formatCurrency(balance)}</p>
      </Card>
      <Card className="p-4 bg-purple-50 border-purple-200">
        <h3 className="text-sm font-medium text-purple-800">Savings Progress</h3>
        <div className="w-full bg-gray-200 rounded-full h-2.5 mt-2">
          <div 
            className="bg-purple-600 h-2.5 rounded-full" 
            style={{ width: `${savingsProgress}%` }}
          ></div>
        </div>
        <p className="text-sm mt-1 text-purple-600">{savingsProgress}% of goal</p>
      </Card>
    </div>
  );
}