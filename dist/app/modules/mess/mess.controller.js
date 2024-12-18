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
exports.MessController = void 0;
const mess__service_1 = require("./mess..service");
// import httpStatus from 'http-status';
// import { paginationFields } from '../../../constants/pagination';
const catchAsync_1 = __importDefault(require("../../../shared/catchAsync"));
// import pick from '../../../shared/pick';
const sendResponse_1 = __importDefault(require("../../../shared/sendResponse"));
// import { cowFilterableFields } from './mess..constant';
// import { IMess } from './mess..interface';
const http_status_1 = __importDefault(require("http-status"));
const config_1 = __importDefault(require("../../../config"));
const createMess = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const messData = __rest(req.body, []);
    const result = yield mess__service_1.MessService.createMess(messData);
    // const { refreshToken } = result;
    // set refresh token into cookie
    const cookieOptions = {
        secure: config_1.default.env === 'production',
        httpOnly: true,
    };
    res.cookie('refreshToken', result === null || result === void 0 ? void 0 : result.refreshToken, cookieOptions);
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        success: true,
        message: 'User logged in successfully !',
        data: result,
    });
    // sendResponse<IMess>(res, {
    //   statusCode: httpStatus.OK,
    //   success: true,
    //   message: 'cow created successfully!',
    //   data: result,
    // });
}));
// const getAllCows = catchAsync(async (req: Request, res: Response) => {
//   const filters = pick(req.query, cowFilterableFields);
//   const paginationOptions = pick(req.query, paginationFields);
//   const result = await CowService.getAllCows(filters, paginationOptions);
//   sendResponse<ICow[]>(res, {
//     statusCode: httpStatus.OK,
//     success: true,
//     message: 'Cows retrieved successfully !',
//     meta: result.meta,
//     data: result.data,
//   });
// });
const getSingleMess = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const result = yield mess__service_1.MessService.getSingleMess(id);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Mess retrieved successfully !',
        data: result,
    });
}));
const updateMess = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const updatedData = req.body;
    const result = yield mess__service_1.MessService.updateMess(id, updatedData);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Mess updated successfully !',
        data: result,
    });
}));
// const deleteCow = catchAsync(async (req: Request, res: Response) => {
//   const id = req.params.id;
//   const result = await CowService.deleteCow(id);
//   sendResponse<ICow>(res, {
//     statusCode: httpStatus.OK,
//     success: true,
//     message: 'Cow deleted successfully !',
//     data: result,
//   });
// });
exports.MessController = {
    createMess,
    // getAllCows,
    getSingleMess,
    updateMess,
    // updateCow,
    // deleteCow,
};
