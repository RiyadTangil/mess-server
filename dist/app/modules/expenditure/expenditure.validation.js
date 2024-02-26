"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExpenditureValidation = void 0;
const zod_1 = require("zod");
const createExpenditureSchema = zod_1.z.object({
    body: zod_1.z.object({
        mess: zod_1.z.string({
            required_error: 'Mess Id is required',
        }),
        user: zod_1.z.string({
            required_error: 'User Id is required',
        }),
        amount: zod_1.z.number({ required_error: 'Mess Id is required' }),
        desc: zod_1.z.string().optional(),
    }),
});
exports.ExpenditureValidation = {
    createExpenditureZodSchema: createExpenditureSchema,
};
