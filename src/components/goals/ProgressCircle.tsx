interface ProgressCircleProps {
  value: number;
  size?: number;
  strokeWidth?: number;
}

export default function ProgressCircle({ 
  value, 
  size = 60, 
  strokeWidth = 6 
}: ProgressCircleProps) {
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const strokeDashoffset = circumference - (value / 100) * circumference;

  const getColor = (val: number) => {
    if (val < 30) return '#EF4444'; // red
    if (val < 70) return '#F59E0B'; // amber
    return '#10B981'; // green
  };

  return (
    <div className="relative inline-flex items-center justify-center">
      <svg height={size} width={size} className="transform -rotate-90">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="transparent"
          stroke="#E5E7EB" // gray-200
          strokeWidth={strokeWidth}
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="transparent"
          stroke={getColor(value)}
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
        />
      </svg>
      <span className="absolute text-lg font-semibold" style={{ color: getColor(value) }}>
        {Math.round(value)}%
      </span>
    </div>
  );
}