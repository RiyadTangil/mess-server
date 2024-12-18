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
exports.MealService = void 0;
/* eslint-disable @typescript-eslint/no-explicit-any */
const mongoose_1 = require("mongoose");
const http_status_1 = __importDefault(require("http-status"));
const ApiError_1 = __importDefault(require("../../../errors/ApiError"));
const meal_model_1 = require("./meal.model");
const user_model_1 = require("../user/user.model");
const mess__model_1 = require("../mess/mess..model");
const createMeal = (meal) => __awaiter(void 0, void 0, void 0, function* () {
    const session = yield (0, mongoose_1.startSession)();
    try {
        session.startTransaction();
        // Create the user within the transaction
        const newMeal = yield meal_model_1.MealChoice.create([meal], { session });
        if (!newMeal) {
            throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, 'Failed to create meal');
        }
        // Update the Mess model to include the created user's _id in the users array
        yield user_model_1.User.findByIdAndUpdate(meal.user, { $push: { meals: newMeal[0]._id } }, { session });
        yield session.commitTransaction();
        session.endSession();
        return newMeal[0];
    }
    catch (error) {
        yield session.abortTransaction();
        session.endSession();
        // Handle errors appropriately
        throw new ApiError_1.default(http_status_1.default.INTERNAL_SERVER_ERROR, 'Internal Server Error');
    }
});
const getMealsByUser = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield user_model_1.User.findOne({ _id: id }).populate('meals');
    return result;
});
const getMealsByMessIdAndDate = (id, date) => __awaiter(void 0, void 0, void 0, function* () {
    const mess = yield mess__model_1.Mess.findOne({ _id: id }).populate({
        path: 'users',
        populate: {
            path: 'meals',
            match: { date: { $eq: date } },
        },
    });
    return mess;
});
const getMealsByMessId = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const mess = yield mess__model_1.Mess.findOne({ _id: id })
        .populate('expenditures')
        .populate({
        path: 'users',
        populate: {
            path: 'meals',
        },
    });
    return mess;
});
const updateMeal = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const isExist = yield meal_model_1.MealChoice.findOne({ _id: id });
    if (!isExist) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, 'Meal not found !');
    }
    const MealData = __rest(payload, []);
    const updatedMealData = Object.assign({}, MealData);
    const result = yield meal_model_1.MealChoice.findOneAndUpdate({ _id: id }, updatedMealData, {
        new: true,
    });
    return result;
});
// const deleteMeal = async (id: string): Promise<IMeal | null> => {
//   const result = await Meal.findByIdAndDelete({ _id: id }).populate('user');
//   return result;
// };
exports.MealService = {
    createMeal,
    getMealsByUser,
    updateMeal,
    getMealsByMessId,
    getMealsByMessIdAndDate,
    // getMealsByUserId,
    // getSingleMeal,
    // updateMeal,
    // deleteMeal,
};
