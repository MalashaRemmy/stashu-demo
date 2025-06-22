// Define the Goal interface locally
interface Goal {
  name: string;
  description: string;
  currentAmount: number;
  targetAmount: number;
  targetDate?: string;
}

// Define a simple Progress component
const Progress = ({ value, className }: { value: number; className?: string }) => (
  <div className={className} style={{ width: '100%', height: '8px', backgroundColor: '#e0e0e0', borderRadius: '4px' }}>
    <div style={{ width: `${value}%`, height: '100%', backgroundColor: '#4caf50', borderRadius: '4px' }} />
  </div>
);

// Define utility functions
const formatCurrency = (amount: number) => `$${amount.toFixed(2)}`;
const formatDate = (dateString: string) => new Date(dateString).toLocaleDateString();

interface GoalCardProps {
  goal: Goal;
  onEdit: () => void;
  onDelete: () => void;
  onContribute: () => void;
}

export default function GoalCard({ goal, onEdit, onDelete, onContribute }: GoalCardProps) {
  const progress = (goal.currentAmount / goal.targetAmount) * 100;
  const daysLeft = goal.targetDate 
    ? Math.ceil((new Date(goal.targetDate).getTime() - Date.now()) / (1000 * 60 * 60 * 24))
    : null;

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-lg font-semibold text-blue-800">{goal.name}</h3>
          <p className="text-gray-600">{goal.description}</p>
        </div>
        <div className="flex space-x-2">
          <button 
            onClick={onEdit}
            className="text-blue-600 hover:text-blue-800"
          >
            Edit
          </button>
          <button 
            onClick={onDelete}
            className="text-red-600 hover:text-red-800"
          >
            Delete
          </button>
        </div>
      </div>

      <div className="mt-4">
        <div className="flex justify-between mb-1">
          <span className="text-sm font-medium">
            {formatCurrency(goal.currentAmount)} of {formatCurrency(goal.targetAmount)}
          </span>
          <span className="text-sm font-medium">{progress.toFixed(0)}%</span>
        </div>
        <Progress value={progress} className="h-2" />
      </div>

      {goal.targetDate && (
        <div className="mt-2 text-sm text-gray-500">
          Target date: {formatDate(goal.targetDate)} 
          {daysLeft && (
            <span className={daysLeft <= 30 ? 'text-amber-600' : 'text-gray-500'}>
              {' '}({Math.ceil(daysLeft)} days left)
            </span>
          )}
        </div>
      )}

      <div className="mt-4 flex justify-end">
        <button
          onClick={onContribute}
          className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 text-sm"
        >
          Add Contribution
        </button>
      </div>
    </div>
  );
}