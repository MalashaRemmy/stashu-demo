import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Goal } from '../../pages/Goals';

interface GoalsState {
  goals: Goal[];
  loading: boolean;
  error: string | null;
}

const initialState: GoalsState = {
  goals: [],
  loading: false,
  error: null,
};

const goalSlice = createSlice({
  name: 'goals',
  initialState,
  reducers: {
    fetchGoalsStart(state) {
      state.loading = true;
      state.error = null;
    },
    fetchGoalsSuccess(state, action: PayloadAction<Goal[]>) {
      state.goals = action.payload;
      state.loading = false;
    },
    fetchGoalsFailure(state, action: PayloadAction<string>) {
      state.error = action.payload;
      state.loading = false;
    },
    addGoalStart(state) {
      state.loading = true;
      state.error = null;
    },
    addGoalSuccess(state, action: PayloadAction<Goal>) {
      state.goals.push(action.payload);
      state.loading = false;
    },
    addGoalFailure(state, action: PayloadAction<string>) {
      state.error = action.payload;
      state.loading = false;
    },
    updateGoalStart(state) {
      state.loading = true;
      state.error = null;
    },
    updateGoalSuccess(state, action: PayloadAction<Goal>) {
      const index = state.goals.findIndex(g => g.id === action.payload.id);
      if (index !== -1) {
        state.goals[index] = action.payload;
      }
      state.loading = false;
    },
    updateGoalFailure(state, action: PayloadAction<string>) {
      state.error = action.payload;
      state.loading = false;
    },
    deleteGoalStart(state) {
      state.loading = true;
      state.error = null;
    },
    deleteGoalSuccess(state, action: PayloadAction<string>) {
      state.goals = state.goals.filter(g => g.id !== action.payload);
      state.loading = false;
    },
    deleteGoalFailure(state, action: PayloadAction<string>) {
      state.error = action.payload;
      state.loading = false;
    },
    contributeToGoalStart(state) {
      state.loading = true;
      state.error = null;
    },
    contributeToGoalSuccess(state, action: PayloadAction<{id: string; amount: number}>) {
      const goal = state.goals.find(g => g.id === action.payload.id);
      if (goal) {
        goal.currentAmount += action.payload.amount;
      }
      state.loading = false;
    },
    contributeToGoalFailure(state, action: PayloadAction<string>) {
      state.error = action.payload;
      state.loading = false;
    },
  },
});

export const {
  fetchGoalsStart,
  fetchGoalsSuccess,
  fetchGoalsFailure,
  addGoalStart,
  addGoalSuccess,
  addGoalFailure,
  updateGoalStart,
  updateGoalSuccess,
  updateGoalFailure,
  deleteGoalStart,
  deleteGoalSuccess,
  deleteGoalFailure,
  contributeToGoalStart,
  contributeToGoalSuccess,
  contributeToGoalFailure,
} = goalSlice.actions;

export default goalSlice.reducer;