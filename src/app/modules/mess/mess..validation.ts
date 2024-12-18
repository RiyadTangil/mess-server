import { z } from 'zod';

const createMessZodSchema = z.object({
  body: z.object({
    name: z.string(),
    meal_rate: z.number().optional(),
    number: z.string(),
    password: z.string(),
  }),
});

const UpdateMessZodSchema = z.object({
  body: z.object({
    meal_rate: z.number().optional(),
  }),
});

export const MessValidation = {
  createMessZodSchema,
  UpdateMessZodSchema,
};
