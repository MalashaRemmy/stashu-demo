import React from 'react';

interface MealPlanCardProps {
  planName: string;
  balance: number;
  mealsRemaining: number;
  expiryDate?: string;
}

export default function MealPlanCard({ planName, balance, mealsRemaining, expiryDate }: MealPlanCardProps) {
  return (
    <div className="bg-white rounded-lg border border-gray-200 p-4 shadow-sm">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">{planName} Plan</h3>
          {expiryDate && <p className="text-sm text-gray-500">Expires: {expiryDate}</p>}
        </div>
        <div className="text-right">
          <p className="text-2xl font-bold text-blue-600">${balance.toFixed(2)}</p>
          <p className="text-sm text-gray-500">Balance</p>
        </div>
      </div>
      <div className="mt-4">
        <p className="text-sm text-gray-700">Meals remaining: <span className="font-semibold">{mealsRemaining}</span></p>
      </div>
    </div>
  );
}