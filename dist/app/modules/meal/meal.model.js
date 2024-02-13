"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MealChoice = void 0;
const mongoose_1 = require("mongoose");
const MealChoiceSchema = new mongoose_1.Schema({
    choices: {
        breakfast: { type: Number, required: true },
        lunch: { type: Number, required: true },
        dinner: { type: Number, required: true },
    },
    date: { type: String, required: true },
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
    newChoice: {
        breakfast: { type: Number, required: false },
        lunch: { type: Number, required: false },
        dinner: { type: Number, required: false },
    },
}, {
    timestamps: true,
    toJSON: {
        virtuals: true,
    },
});
exports.MealChoice = (0, mongoose_1.model)('MealChoice', MealChoiceSchema);
