"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const mongoose_1 = require("mongoose");
const bcrypt_1 = __importDefault(require("bcrypt"));
const depositWithdrawSchema = new mongoose_1.Schema({
    amount: {
        type: Number,
        required: false,
    },
    date: {
        type: String,
        required: false,
    },
});
const userSchema = new mongoose_1.Schema({
    // id: {
    //   type: String,
    //   required: true,
    //   unique: true,
    // },
    mess_id: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'Mess',
    },
    number: {
        type: String,
        required: true,
        unique: true,
    },
    role: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    meals: [
        {
            type: mongoose_1.Schema.Types.ObjectId,
            ref: 'MealChoice',
        },
    ],
    deposit: {
        type: [depositWithdrawSchema],
        required: false,
    },
    withdraw: {
        type: [depositWithdrawSchema],
        required: false,
    },
}, {
    timestamps: true,
    toJSON: {
        virtuals: true,
    },
});
userSchema.statics.isUserExist = function (number) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield exports.User.findOne({ number }, { id: 1, password: 1, role: 1, number: 1 });
    });
};
userSchema.statics.isPasswordMatched = function (givenPassword, savedPassword) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield bcrypt_1.default.compare(givenPassword, savedPassword);
    });
};
exports.User = (0, mongoose_1.model)('User', userSchema);
