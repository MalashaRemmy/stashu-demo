import React, { useState, useEffect } from 'react';
import MealPlanCard from '../components/features/meal-plans/MealPlanCard';
import MealPlanForm from '../components/features/meal-plans/MealPlanForm';

// Define types for meal plans
interface MealPlan {
  id: string;
  name: string;
  balance: number;
  mealsRemaining: number;
  expiryDate?: string;
}

const MealPlans: React.FC = () => {
  // Mock data (replace with API calls)
  const availablePlans = ["Basic", "Standard", "Premium"];
  const [currentMealPlan, setCurrentMealPlan] = useState<MealPlan>({
    id: "1",
    name: "Standard",
    balance: 250.50,
    mealsRemaining: 12,
    expiryDate: "2023-12-31",
  });

  // Simulate fetching data (replace with actual API call)
  useEffect(() => {
    // fetchMealPlanData().then(data => setCurrentMealPlan(data));
  }, []);

  // Handle form submission (e.g., API PATCH request)
  const handlePlanUpdate = (selectedPlan: string, additionalFunds?: number) => {
    // In a real app, send this to your backend
    const updatedPlan: MealPlan = {
      ...currentMealPlan,
      name: selectedPlan,
      balance: additionalFunds 
        ? currentMealPlan.balance + additionalFunds 
        : currentMealPlan.balance,
    };
    setCurrentMealPlan(updatedPlan);
    alert(`Meal plan updated to ${selectedPlan}!`);
  };

  return (
    <div className="meal-plans-container">
      <h2>Meal Plan</h2>
      
      {/* Display current plan */}
      <MealPlanCard
        planName={currentMealPlan.name}
        balance={currentMealPlan.balance}
        mealsRemaining={currentMealPlan.mealsRemaining}
        expiryDate={currentMealPlan.expiryDate}
      />

      {/* Form to change plan */}
      <MealPlanForm 
        onSubmit={handlePlanUpdate} 
        availablePlans={availablePlans} 
      />

      {/* Optional: Transaction history or usage stats */}
      <div className="meal-plan-history">
        <h4>Recent Transactions</h4>
        <p>No recent activity.</p> 
        {/* Map through transactions here */}
      </div>
    </div>
  );
};

export default MealPlans;