import {Card } from '../../components/ui/Card';

export default function StatsCards() {
  const stats = [
    { icon: 'fas fa-wallet', value: '$2,450', label: 'Current Balance' },
    { icon: 'fas fa-arrow-up', value: '$1,200', label: 'Monthly Income' },
    { icon: 'fas fa-arrow-down', value: '$850', label: 'Monthly Expenses' },
    { icon: 'fas fa-piggy-bank', value: '$350', label: 'Monthly Savings' }
  ];

  return (
    <div className="stats-grid">
      {stats.map((stat, index) => (
        <Card key={index} className="stat-card">
          <i className={stat.icon}></i>
          <div className="stat-value">{stat.value}</div>
          <div className="stat-label">{stat.label}</div>
        </Card>
      ))}
    </div>
  );
}