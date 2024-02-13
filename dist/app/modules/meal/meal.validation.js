"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MealValidation = void 0;
const zod_1 = require("zod");
const ChoiceSchema = zod_1.z.object({
    breakfast: zod_1.z.number(),
    lunch: zod_1.z.number(),
    dinner: zod_1.z.number(),
});
const createMealSchema = zod_1.z.object({
    body: zod_1.z.object({
        choices: ChoiceSchema,
        date: zod_1.z.string(),
        mess: zod_1.z.string(),
        user: zod_1.z.string(),
        newChoice: ChoiceSchema.optional(),
    }),
});
exports.MealValidation = {
    createMealZodSchema: createMealSchema,
};
