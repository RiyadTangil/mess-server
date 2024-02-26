"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Expenditures = void 0;
const mongoose_1 = require("mongoose");
const Expenditure = new mongoose_1.Schema({
    desc: { type: String, required: false },
    amount: { type: Number, required: true },
    user: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    mess: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'Mess',
        required: true,
    },
}, {
    timestamps: true,
    toJSON: {
        virtuals: true,
    },
});
exports.Expenditures = (0, mongoose_1.model)('Expenditure', Expenditure);
