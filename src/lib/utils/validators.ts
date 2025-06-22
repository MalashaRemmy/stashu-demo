import * as yup from 'yup';
import { AnyObject } from 'yup';

yup.setLocale({
  mixed: {
    required: '${path} is required',
  },
  number: {
    positive: '${path} must be positive',
  },
});

export const expenseSchema = yup.object().shape({
  amount: yup
    .number()
    .typeError('Amount must be a number')
    .required()
    .positive(),
  category: yup.string().required().trim(),
  description: yup.string().optional().trim(),
  date: yup
    .date()
    .typeError('Invalid date format')
    .required()
    .max(new Date(), 'Date cannot be in the future')
    .transform((_, val) => (val instanceof Date ? val : new Date(val))),
});

export type ExpenseInput = yup.InferType<typeof expenseSchema>;

export const validateExpenseInput = async (data: AnyObject) => {
  try {
    await expenseSchema.validate(data, { abortEarly: false });
    return { valid: true };
  } catch (err) {
    if (err instanceof yup.ValidationError) {
      return {
        valid: false,
        errors: err.errors,
      };
    }
    throw err;
  }
};