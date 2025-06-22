export const groupByTimeframe = (
  data: { date: string; amount: number }[],
  timeframe: 'daily' | 'weekly' | 'monthly' = 'monthly'
) => {
  // Group data by timeframe and sum amounts
  const grouped: Record<string, number> = {};

  data.forEach(item => {
    const date = new Date(item.date);
    let key: string;

    if (timeframe === 'daily') {
      key = date.toLocaleDateString();
    } else if (timeframe === 'weekly') {
      const weekStart = new Date(date);
      weekStart.setDate(date.getDate() - date.getDay());
      key = `Week of ${weekStart.toLocaleDateString()}`;
    } else {
      // monthly
      key = date.toLocaleString('default', { month: 'short', year: 'numeric' });
    }

    grouped[key] = (grouped[key] || 0) + item.amount;
  });

  return Object.entries(grouped).map(([time, amount]) => ({
    time,
    amount
  }));
};

export const preparePieData = (
  data: { category: string; amount: number }[]
) => {
  const categoryMap: Record<string, number> = {};

  data.forEach(item => {
    categoryMap[item.category] = (categoryMap[item.category] || 0) + item.amount;
  });

  return Object.entries(categoryMap).map(([name, value]) => ({
    name,
    value
  }));
};