"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserValidation = void 0;
const zod_1 = require("zod");
const createUserZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        number: zod_1.z.string({
            required_error: 'number is required',
        }),
        password: zod_1.z.string({
            required_error: 'password is required',
        }),
        mess_id: zod_1.z.string({
            required_error: 'mess Id is required',
        }),
        name: zod_1.z.string().optional(),
        deposit: zod_1.z
            .array(zod_1.z.object({
            amount: zod_1.z.number(),
            date: zod_1.z.string(),
        }))
            .optional(),
        withdraw: zod_1.z
            .array(zod_1.z.object({
            amount: zod_1.z.number(),
            date: zod_1.z.string(),
        }))
            .optional(),
    }),
});
exports.UserValidation = {
    createUserZodSchema,
};
