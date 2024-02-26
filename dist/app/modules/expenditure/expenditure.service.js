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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExpenditureService = void 0;
/* eslint-disable @typescript-eslint/no-explicit-any */
const mongoose_1 = require("mongoose");
const http_status_1 = __importDefault(require("http-status"));
const ApiError_1 = __importDefault(require("../../../errors/ApiError"));
const mess__model_1 = require("../mess/mess..model");
const user_model_1 = require("../user/user.model");
const expenditure_model_1 = require("./expenditure.model");
const createExpenditure = (expenditure) => __awaiter(void 0, void 0, void 0, function* () {
    const session = yield (0, mongoose_1.startSession)();
    try {
        session.startTransaction();
        // Create the Expenditure within the transaction
        const newExpenditure = yield expenditure_model_1.Expenditures.create([expenditure], {
            session,
        });
        if (!newExpenditure) {
            throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, 'Failed to create Expenditure');
        }
        // Update the Mess model to include the created expenditures's _id in the users array
        yield user_model_1.User.findByIdAndUpdate(expenditure.user, { $push: { expenditures: newExpenditure[0]._id } }, { session });
        yield mess__model_1.Mess.findByIdAndUpdate(expenditure.mess, { $push: { expenditures: newExpenditure[0]._id } }, { session });
        yield session.commitTransaction();
        session.endSession();
        return newExpenditure[0];
    }
    catch (error) {
        yield session.abortTransaction();
        session.endSession();
        // Handle errors appropriately
        throw new ApiError_1.default(http_status_1.default.INTERNAL_SERVER_ERROR, 'Internal Server Error');
    }
});
const getExpendituresByUser = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield user_model_1.User.findOne({ _id: id }).populate('Expenditures');
    return result;
});
const getExpendituresByMessIdAndDate = (id, date) => __awaiter(void 0, void 0, void 0, function* () {
    const mess = yield mess__model_1.Mess.findOne({ _id: id }).populate({
        path: 'users',
        populate: {
            path: 'expenditures',
            match: { date: { $eq: date } },
        },
    });
    return mess;
});
const getExpendituresByMessId = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const mess = yield mess__model_1.Mess.findOne({ _id: id })
        .populate({
        path: 'expenditures',
        populate: {
            path: 'user',
            select: 'name',
        },
    })
        .populate({
        path: 'users',
        select: 'name',
    })
        .select('expenditures users');
    return mess;
});
const updateExpenditure = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const isExist = yield expenditure_model_1.Expenditures.findOne({ _id: id });
    if (!isExist) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, 'Expenditure not found !');
    }
    const ExpenditureData = __rest(payload, []);
    const updatedExpenditureData = Object.assign({}, ExpenditureData);
    const result = yield expenditure_model_1.Expenditures.findOneAndUpdate({ _id: id }, updatedExpenditureData, {
        new: true,
    });
    return result;
});
// const deleteExpenditure = async (id: string): Promise<IExpenditure | null> => {
//   const result = await Expenditure.findByIdAndDelete({ _id: id }).populate('user');
//   return result;
// };
exports.ExpenditureService = {
    createExpenditure,
    getExpendituresByUser,
    updateExpenditure,
    getExpendituresByMessId,
    getExpendituresByMessIdAndDate,
    // getExpendituresByUserId,
    // getSingleExpenditure,
    // updateExpenditure,
    // deleteExpenditure,
};
