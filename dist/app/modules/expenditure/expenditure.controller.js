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
exports.ExpenditureController = void 0;
const http_status_1 = __importDefault(require("http-status"));
const catchAsync_1 = __importDefault(require("../../../shared/catchAsync"));
const sendResponse_1 = __importDefault(require("../../../shared/sendResponse"));
const expenditure_service_1 = require("./expenditure.service");
const createExpenditure = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const ExpenditureData = __rest(req.body, []);
    const result = yield expenditure_service_1.ExpenditureService.createExpenditure(ExpenditureData);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Expenditures created successfully!',
        data: result,
    });
}));
const getExpendituresByMessIdAndDate = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { date } = req.query;
    const result = yield expenditure_service_1.ExpenditureService.getExpendituresByMessIdAndDate(id, date);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Expenditures retrieved successfully !',
        data: result,
    });
}));
const getExpendituresByMessId = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const result = yield expenditure_service_1.ExpenditureService.getExpendituresByMessId(id);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Expenditures retrieved successfully !',
        data: result,
    });
}));
const getExpendituresByUser = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const result = yield expenditure_service_1.ExpenditureService.getExpendituresByUser(id);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Expenditures retrieved successfully !',
        data: result,
    });
}));
const updateExpenditure = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const updatedData = req.body;
    const result = yield expenditure_service_1.ExpenditureService.updateExpenditure(id, updatedData);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Expenditures updated successfully !',
        data: result,
    });
}));
// const deleteExpenditure = catchAsync(async (req: Request, res: Response) => {
//   const id = req.params.id;
//   const result = await ExpenditureService.deleteExpenditure(id);
//   sendResponse<IExpenditureChoice>(res, {
//     statusCode: httpStatus.OK,
//     success: true,
//     message: 'Expenditures deleted successfully !',
//     data: result,
//   });
// });
exports.ExpenditureController = {
    createExpenditure,
    getExpendituresByMessId,
    getExpendituresByMessIdAndDate,
    getExpendituresByUser,
    updateExpenditure,
    // deleteExpenditure,
};
