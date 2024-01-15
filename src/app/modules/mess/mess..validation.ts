import { z } from 'zod';

const createMessZodSchema = z.object({
  body: z.object({
    name: z.string(),
    number: z.string(),
    password: z.string(),
  }),
});

export const MessValidation = {
  createMessZodSchema,
};
