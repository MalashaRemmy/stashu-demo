// File: components/Dashboard.tsx
import React from 'react';
import { Card, CardContent } from './ui/Card';
import { FinancialChart } from './FinancialChart';
import { CreatePlan } from './CreatePlan';

export function Dashboard() {
  return (
    <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
      <Card>
        <CardContent>
          <h2 className="text-xl font-semibold mb-2">Cash Flow Overview</h2>
          <FinancialChart />
        </CardContent>
      </Card>

      <Card>
        <CardContent>
          <h2 className="text-xl font-semibold mb-2">Create New Financial Plan</h2>
          <CreatePlan />
        </CardContent>
      </Card>
    </div>
  );
}