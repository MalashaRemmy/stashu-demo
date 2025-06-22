// mealPlanSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Define the meal type (adjust fields as needed)
interface Meal {
  id: string;
  name: string;
  calories?: number;
}

// Define the state structure
interface MealPlanState {
  meals: Meal[];
  isLoading: boolean;
  error: string | null;
}

// Initial state
const initialState: MealPlanState = {
  meals: [], // Should not be blank!
  isLoading: false,
  error: null,
};

// Create the slice
const mealPlanSlice = createSlice({
  name: 'mealPlan', // Used in Redux DevTools & selectors
  initialState,
  reducers: {
    // Add a meal
    addMeal: (state, action: PayloadAction<Meal>) => {
      state.meals.push(action.payload);
    },
    // Remove a meal by ID
    removeMeal: (state, action: PayloadAction<string>) => {
      state.meals = state.meals.filter(meal => meal.id !== action.payload);
    },
    // Clear all meals
    clearMeals: (state) => {
      state.meals = [];
    },
    // ...add more reducers as needed
  },
});

// Export actions
export const { addMeal, removeMeal, clearMeals } = mealPlanSlice.actions;

// Export reducer (for store configuration)
export default mealPlanSlice.reducer;