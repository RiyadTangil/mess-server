import { z } from 'zod';

const ChoiceSchema = z.object({
  breakfast: z.number(),
  lunch: z.number(),
  dinner: z.number(),
});
const createMealSchema = z.object({
  body: z.object({
    choices: ChoiceSchema,
    date: z.string(),
    mess: z.string(), // Assuming mess is a string, adjust if it's another type
    user: z.string(), // Assuming user is a string, adjust if it's another type
    newChoice: ChoiceSchema.optional(),
  }),
});

export const MealValidation = {
  createMealZodSchema: createMealSchema,
};
