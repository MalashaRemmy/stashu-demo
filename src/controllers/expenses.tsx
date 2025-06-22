// src/controllers/expenses.ts
import { Request, Response } from 'express'; // or from your framework
import prisma from '../lib/prisma';
import { validateExpenseInput } from '../lib/utils/validators';

// Define AuthenticatedRequest type
interface AuthenticatedRequest extends Request {
  user: {
    id: string;
    // add other user properties if needed
  };
}

export const createExpense = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const validationResult = await validateExpenseInput(req.body);
    if (!validationResult.valid) {
      return res.status(400).json({ error: validationResult.errors?.[0] || 'Invalid input' });
    }

    const expense = await prisma.expense.create({
      data: {
        amount: req.body.amount,
        category: req.body.category,
        description: req.body.description,
        date: new Date(req.body.date),
        userId: req.user.id,
      },
    });

    res.status(201).json(expense);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to create expense' });
  }
};
export const getExpenseSummary = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const { timeframe = 'monthly' } = req.query;
    
    const expenses = await prisma.expense.groupBy({
      by: ['category'],
      where: {
        userId: req.user.id,
        date: getTimeframeDateCondition(timeframe as string),
      },
      _sum: {
        amount: true,
      },
      orderBy: {
        _sum: {
          amount: 'desc',
        },
      },
    });

    res.json(expenses);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to get expense summary' });
  }
};

function getTimeframeDateCondition(timeframe: string) {
  const now = new Date();
  let startDate: Date;
  
  switch (timeframe) {
    case 'weekly':
      startDate = new Date(now.setDate(now.getDate() - 7));
      break;
    case 'monthly':
      startDate = new Date(now.setMonth(now.getMonth() - 1));
      break;
    case 'semester':
      startDate = new Date(now.setMonth(now.getMonth() - 4));
      break;
    case 'yearly':
      startDate = new Date(now.setFullYear(now.getFullYear() - 1));
      break;
    default:
      startDate = new Date(now.setMonth(now.getMonth() - 1));
  }
  
  return {
    gte: startDate,
    lte: new Date(),
  };
}