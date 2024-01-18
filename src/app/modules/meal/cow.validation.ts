import { z } from 'zod';
import {
  breed,
  categories,
  label,
  location,
} from './cow.constant';

const updateCowZodSchema = z.object({
  body: z.object({
    name: z.string(),
    age: z.number(),
    price: z.number(),
    weight: z.number(),
    location: z.enum([...location] as [string, ...string[]]).optional(),
    breed: z.enum([...breed] as [string, ...string[]]).optional(),
    label: z.enum([...label] as [string, ...string[]]).optional(),
    category: z.enum([...categories] as [string, ...string[]]).optional(),
    seller: z.string().optional(),
  }),
});

export const CowValidation = {
  updateCowZodSchema,
};
