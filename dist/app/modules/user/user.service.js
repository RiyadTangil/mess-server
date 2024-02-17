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
exports.UserService = void 0;
const http_status_1 = __importDefault(require("http-status"));
const ApiError_1 = __importDefault(require("../../../errors/ApiError"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const user_model_1 = require("./user.model");
const mess__model_1 = require("../mess/mess..model");
const mongoose_1 = require("mongoose");
const config_1 = __importDefault(require("../../../config"));
const createUser = (user) => __awaiter(void 0, void 0, void 0, function* () {
    const session = yield (0, mongoose_1.startSession)();
    try {
        session.startTransaction();
        const newHashedPassword = yield bcrypt_1.default.hash(user.password, Number(config_1.default.bycrypt_salt_rounds));
        user.password = newHashedPassword;
        // Create the user within the transaction
        const newUser = yield user_model_1.User.create([user], { session });
        if (!newUser) {
            throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, 'Failed to create user');
        }
        // Update the Mess model to include the created user's _id in the users array
        yield mess__model_1.Mess.findByIdAndUpdate(user.mess_id, { $push: { users: newUser[0]._id } }, { session });
        yield session.commitTransaction();
        session.endSession();
        return newUser[0];
    }
    catch (error) {
        yield session.abortTransaction();
        session.endSession();
        // Handle errors appropriately
        throw new ApiError_1.default(http_status_1.default.INTERNAL_SERVER_ERROR, 'Internal Server Error');
    }
});
const getAllUsers = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield user_model_1.User.find({});
    return {
        meta: {
            page: 0,
            limit: 0,
            total: 0,
        },
        data: result,
    };
});
const getSingleUser = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield user_model_1.User.findOne({ _id: id });
    return result;
});
const updateUser = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const isExist = yield user_model_1.User.findOne({ _id: id });
    if (!isExist) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, 'User not found !');
    }
    if (payload.password) {
        const newHashedPassword = yield bcrypt_1.default.hash(payload.password, Number(config_1.default.bycrypt_salt_rounds));
        payload.password = newHashedPassword;
    }
    const result = yield user_model_1.User.findOneAndUpdate({ _id: id }, payload, {
        new: true,
    });
    return result;
});
const deleteUser = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield user_model_1.User.findByIdAndDelete(id);
    return result;
});
exports.UserService = {
    createUser,
    getAllUsers,
    getSingleUser,
    updateUser,
    deleteUser,
};
