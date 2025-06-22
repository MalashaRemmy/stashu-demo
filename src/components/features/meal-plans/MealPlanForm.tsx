import React, { useState } from 'react';

interface MealPlanFormProps {
  onSubmit: (selectedPlan: string, additionalFunds?: number) => void;
  availablePlans: string[];
}

const MealPlanForm: React.FC<MealPlanFormProps> = ({ onSubmit, availablePlans }) => {
  const [selectedPlan, setSelectedPlan] = useState<string>(availablePlans[0]);
  const [additionalFunds, setAdditionalFunds] = useState<number>(0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(selectedPlan, additionalFunds);
  };

  return (
    <form onSubmit={handleSubmit} className="meal-plan-form">
      <div>
        <label>Select Meal Plan:</label>
        <select
          value={selectedPlan}
          onChange={(e) => setSelectedPlan(e.target.value)}
        >
          {availablePlans.map((plan) => (
            <option key={plan} value={plan}>
              {plan}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label>Add Extra Funds ($):</label>
        <input
          type="number"
          min="0"
          value={additionalFunds}
          onChange={(e) => setAdditionalFunds(Number(e.target.value))}
        />
      </div>
      <button type="submit">Update Plan</button>
    </form>
  );
};

export default MealPlanForm;