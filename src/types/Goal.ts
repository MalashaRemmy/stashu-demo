export type GoalStatus = 'active' | 'completed' | 'cancelled';

export interface Goal {
  id: string;
  userId: string;
  title: string;
  description?: string;
  targetAmount: number;
  currentAmount: number;
  deadline?: string | Date;
  status: GoalStatus;
  createdAt: string | Date;
  updatedAt: string | Date;
}

export interface CreateGoalPayload {
  title: string;
  description?: string;
  targetAmount: number;
  deadline?: string | Date;
}

export interface UpdateGoalPayload extends Partial<CreateGoalPayload> {
  id: string;
  status?: GoalStatus;
}

export interface GoalFilterOptions {
  status?: GoalStatus;
  minTargetAmount?: number;
  maxTargetAmount?: number;
  deadlineBefore?: string | Date;
  deadlineAfter?: string | Date;
}
