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
exports.MessService = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
/* eslint-disable @typescript-eslint/no-explicit-any */
// import { SortOrder } from 'mongoose';
// import { paginationHelpers } from '../../../helpers/paginationHelper';
// import { IGenericResponse } from '../../../interfaces/common';
// import { IPaginationOptions } from '../../../interfaces/pagination';
const http_status_1 = __importDefault(require("http-status"));
const ApiError_1 = __importDefault(require("../../../errors/ApiError"));
const mess__model_1 = require("./mess..model");
const mongoose_1 = __importDefault(require("mongoose"));
const user_model_1 = require("../user/user.model");
const config_1 = __importDefault(require("../../../config"));
const user_1 = require("../../../enums/user");
const jwtHelpers_1 = require("../../../helpers/jwtHelpers");
const createMess = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    // create user
    const { name, number, password } = payload;
    const session = yield mongoose_1.default.startSession();
    let tokenInfo = null;
    try {
        session.startTransaction();
        const isNameExist = yield user_model_1.User.findOne({ number });
        if (isNameExist) {
            throw new ApiError_1.default(http_status_1.default.NOT_FOUND, 'Number already  exist use a different Number');
        }
        const newHashedPassword = yield bcrypt_1.default.hash(password, Number(config_1.default.bycrypt_salt_rounds));
        const userInfo = {
            name: 'admin name',
            number,
            password: newHashedPassword,
            role: user_1.ENUM_USER_ROLE.ADMIN,
        };
        const createdUser = yield user_model_1.User.create(userInfo);
        if (!createdUser) {
            throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, 'Failed to create User');
        }
        const messInfo = {
            name,
            meal_rate: 0,
            admin: createdUser._id,
            users: [createdUser._id],
        };
        const createdMessAccount = yield mess__model_1.Mess.create(messInfo);
        if (!createdMessAccount) {
            throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, 'Failed to create Mess Account');
        }
        // 3. Update the user's mess field with the Mess account's _id
        yield user_model_1.User.findByIdAndUpdate(createdUser._id, {
            mess_id: createdMessAccount._id,
        });
        const { _id, role } = createdUser;
        tokenInfo = {
            userId: _id,
            role,
            mess_id: createdMessAccount._id,
            name,
            meal_rate: 0,
        };
        yield session.commitTransaction();
        yield session.endSession();
    }
    catch (error) {
        yield session.abortTransaction();
        yield session.endSession();
        throw error;
    }
    const accessToken = jwtHelpers_1.jwtHelpers.createToken(tokenInfo, config_1.default.jwt.secret, config_1.default.jwt.expires_in);
    const refreshToken = jwtHelpers_1.jwtHelpers.createToken(tokenInfo, config_1.default.jwt.refresh_secret, config_1.default.jwt.refresh_expires_in);
    return {
        accessToken,
        refreshToken,
        data: tokenInfo,
    };
});
// const getAllCows = async (
//   filters: ICowFilters,
//   paginationOptions: IPaginationOptions
// ): Promise<IGenericResponse<ICow[]>> => {
//   const { searchTerm, ...filtersData } = filters;
//   const { page, limit, skip, sortBy, sortOrder } =
//     paginationHelpers.calculatePagination(paginationOptions);
//   const andConditions = [];
//   if (filtersData.maxPrice) {
//     andConditions.push({
//       price: {
//         $lte: filtersData.maxPrice,
//       },
//     });
//   }
//   if (filtersData.minPrice) {
//     const priceComparisonOperator = '$gte';
//     andConditions.push({
//       price: {
//         [priceComparisonOperator]: filtersData.maxPrice,
//       },
//     });
//   }
//   if (searchTerm) {
//     andConditions.push({
//       $or: cowSearchableFields.map(field => ({
//         [field]: {
//           $regex: searchTerm,
//           $options: 'i',
//         },
//       })),
//     });
//   }
//   if (Object.keys(filtersData).length) {
//     andConditions.push({
//       $and: Object.entries(filtersData).map(([field, value]) => ({
//         [field]: value,
//       })),
//     });
//   }
//   const sortConditions: { [key: string]: SortOrder } = {};
//   if (sortBy && sortOrder) {
//     sortConditions[sortBy] = sortOrder;
//   }
//   const whereConditions =
//     andConditions.length > 0 ? { $and: andConditions } : {};
//   const result = await Mess.find(whereConditions)
//     .sort(sortConditions)
//     .skip(skip)
//     .limit(limit);
//   const total = await Mess.countDocuments(whereConditions);
//   return {
//     meta: {
//       page,
//       limit,
//       total,
//     },
//     data: result,
//   };
// };
const getSingleMess = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield mess__model_1.Mess.findOne({ _id: id }).populate({
        path: 'users',
    });
    return result;
});
const updateMess = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const isExist = yield mess__model_1.Mess.findOne({ _id: id });
    if (!isExist) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, 'Mess not found !');
    }
    const CowData = __rest(payload, []);
    const updatedCowData = Object.assign({}, CowData);
    /* const name ={
      fisrtName: 'Mezba',  <----- update korar jnno
      middleName:'Abedin',
      lastName: 'Forhan'
    }
  */
    // dynamically handling
    const result = yield mess__model_1.Mess.findOneAndUpdate({ _id: id }, updatedCowData, {
        new: true,
    });
    return result;
});
// const deleteCow = async (id: string): Promise<ICow | null> => {
//   const result = await Mess.findByIdAndDelete({ _id: id }).populate('user');
//   return result;
// };
exports.MessService = {
    createMess,
    // getAllCows,
    getSingleMess,
    updateMess,
    // deleteCow,
};
