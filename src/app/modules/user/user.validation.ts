import { z } from 'zod';

const createUserZodSchema = z.object({
  body: z.object({
    number: z.string({
      required_error: 'number is required',
    }),
    password: z.string({
      required_error: 'password is required',
    }),
    mess_id: z.string({
      required_error: 'mess Id is required',
    }),
    name: z.string().optional(),
    deposit: z
      .array(
        z.object({
          amount: z.number(),
          date: z.string(),
        })
      )
      .optional(),

    withdraw: z
      .array(
        z.object({
          amount: z.number(),
          date: z.string(),
        })
      )
      .optional(),
  }),
});

export const UserValidation = {
  createUserZodSchema,
};
