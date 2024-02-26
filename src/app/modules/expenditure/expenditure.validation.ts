import { z } from 'zod';

const createExpenditureSchema = z.object({
  body: z.object({
    mess: z.string({
      required_error: 'Mess Id is required',
    }),
    user: z.string({
      required_error: 'User Id is required',
    }),
    amount: z.number({ required_error: 'Mess Id is required' }),
    desc: z.string().optional(),
  }),
});

export const ExpenditureValidation = {
  createExpenditureZodSchema: createExpenditureSchema,
};
