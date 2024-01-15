import { z } from 'zod';

const OrderZodSchema = z.object({
  body: z.object({
    cow: z.string().optional(),
    buyer: z.string().optional(),
  }),
});

export const OrderValidation = {
  OrderZodSchema,
};
