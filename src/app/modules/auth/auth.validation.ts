import { z } from 'zod';

const loginZodSchema = z.object({
  body: z.object({
    number: z.string({
      required_error: 'ID is required',
    }),
    password: z.string({
      required_error: 'Password is required',
    }),
  }),
});
const createMessZodSchema = z.object({
  body: z.object({
    messName: z.string({
      required_error: 'Name is required',
    }),
    number: z.string({
      required_error: 'Number is required',
    }),
    password: z.string({
      required_error: 'Password is required',
    }),
  }),
});

const refreshTokenZodSchema = z.object({
  cookies: z.object({
    refreshToken: z.string({
      required_error: 'Refresh Token is required',
    }),
  }),
});

const changePasswordZodSchema = z.object({
  body: z.object({
    oldPassword: z.string({
      required_error: 'Old password  is required',
    }),
    newPassword: z.string({
      required_error: 'New password  is required',
    }),
  }),
});

export const AuthValidation = {
  loginZodSchema,
  createMessZodSchema,
  refreshTokenZodSchema,
  changePasswordZodSchema,
};
