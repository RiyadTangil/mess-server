"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MessValidation = void 0;
const zod_1 = require("zod");
const createMessZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string(),
        number: zod_1.z.string(),
        password: zod_1.z.string(),
    }),
});
exports.MessValidation = {
    createMessZodSchema,
};
