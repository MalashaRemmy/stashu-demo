interface ProgressProps {
  value: number;
  max?: number;
  className?: string;
}

export default function Progress({ value, max = 100, className = '' }: ProgressProps) {
  const percentage = Math.min((value / max) * 100, 100);
  const getColor = (val: number) => {
    if (val < 30) return 'bg-red-500';
    if (val < 70) return 'bg-amber-500';
    return 'bg-green-500';
  };

  return (
    <div className={`w-full bg-gray-200 rounded-full h-2 ${className}`}>
      <div
        className={`h-full rounded-full ${getColor(percentage)}`}
        style={{ width: `${percentage}%` }}
      ></div>
    </div>
  );
}