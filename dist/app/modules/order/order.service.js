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
exports.OrderService = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const paginationHelper_1 = require("../../../helpers/paginationHelper");
const order_model_1 = require("./order.model");
const user_model_1 = require("../user/user.model");
const cow_model_1 = require("../cow/cow.model");
const ApiError_1 = __importDefault(require("../../../errors/ApiError"));
const http_status_1 = __importDefault(require("http-status"));
const createOrder = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const session = yield mongoose_1.default.startSession();
    let newOrder = null;
    try {
        session.startTransaction();
        const buyerInfo = yield user_model_1.User.findOne({ _id: payload.buyer });
        const cowInfo = yield cow_model_1.Cow.findOne({ _id: payload.cow }).populate('seller');
        if ((cowInfo === null || cowInfo === void 0 ? void 0 : cowInfo.label) !== 'for sale') {
            throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, 'Cow sold out');
        }
        else if ((buyerInfo === null || buyerInfo === void 0 ? void 0 : buyerInfo.budget) && (buyerInfo === null || buyerInfo === void 0 ? void 0 : buyerInfo.budget) < (cowInfo === null || cowInfo === void 0 ? void 0 : cowInfo.price)) {
            throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, "You don't have enough Budget");
        }
        else {
            const labelUpdate = { label: 'sold out' };
            const newCow = yield cow_model_1.Cow.findOneAndUpdate({ _id: payload.cow }, labelUpdate, { session });
            if (!newCow) {
                throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, 'Failed to perform order request');
            }
            const newBudget = (buyerInfo === null || buyerInfo === void 0 ? void 0 : buyerInfo.budget)
                ? { budget: (buyerInfo === null || buyerInfo === void 0 ? void 0 : buyerInfo.budget) - (cowInfo === null || cowInfo === void 0 ? void 0 : cowInfo.price) }
                : {};
            const newBuyer = yield user_model_1.User.findOneAndUpdate({ _id: payload.buyer }, newBudget, { session });
            if (!newBuyer) {
                throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, '2Failed to perform order request');
            }
            const seller = cowInfo.seller;
            const sellerBudget = { budget: (seller === null || seller === void 0 ? void 0 : seller.budget) + (cowInfo === null || cowInfo === void 0 ? void 0 : cowInfo.price) };
            const newSeller = yield user_model_1.User.findOneAndUpdate({ _id: seller._id ? seller._id : null }, sellerBudget, { session });
            if (!newSeller) {
                throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, 'Failed to perform order request');
            }
            const order = yield order_model_1.Order.create(payload);
            newOrder = order;
            if (!order) {
                throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, 'Failed to create order');
            }
            yield session.commitTransaction();
            yield session.endSession();
        }
    }
    catch (error) {
        yield session.abortTransaction();
        yield session.endSession();
        throw error;
    }
    return newOrder;
});
const getAllOrders = (paginationOptions) => __awaiter(void 0, void 0, void 0, function* () {
    const { page, limit, skip, sortBy, sortOrder } = paginationHelper_1.paginationHelpers.calculatePagination(paginationOptions);
    const sortConditions = {};
    if (sortBy && sortOrder) {
        sortConditions[sortBy] = sortOrder;
    }
    const result = yield order_model_1.Order.find({})
        .sort(sortConditions)
        .skip(skip)
        .limit(limit);
    const total = yield order_model_1.Order.countDocuments();
    return {
        meta: {
            page,
            limit,
            total,
        },
        data: result,
    };
});
exports.OrderService = {
    createOrder,
    getAllOrders,
};
