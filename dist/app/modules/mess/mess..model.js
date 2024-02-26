"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Mess = exports.MessSchema = void 0;
const mongoose_1 = require("mongoose");
exports.MessSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: true,
    },
    admin: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    users: [
        {
            type: mongoose_1.Schema.Types.ObjectId,
            ref: 'User',
        },
    ],
    expenditures: [
        {
            type: mongoose_1.Schema.Types.ObjectId,
            ref: 'Expenditure',
        },
    ],
}, {
    timestamps: true,
    toJSON: {
        virtuals: true,
    },
});
exports.Mess = (0, mongoose_1.model)('Mess', exports.MessSchema);
