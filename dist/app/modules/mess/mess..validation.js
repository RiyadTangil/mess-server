"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MessValidation = void 0;
const zod_1 = require("zod");
const createMessZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string(),
        meal_rate: zod_1.z.number().optional(),
        number: zod_1.z.string(),
        password: zod_1.z.string(),
    }),
});
const UpdateMessZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        meal_rate: zod_1.z.number().optional(),
    }),
});
exports.MessValidation = {
    createMessZodSchema,
    UpdateMessZodSchema,
};
