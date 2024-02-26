"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExpenditureRoutes = void 0;
const express_1 = __importDefault(require("express"));
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const expenditure_validation_1 = require("./expenditure.validation");
const expenditure_controller_1 = require("./expenditure.controller");
const router = express_1.default.Router();
router.post('/create-expenditure', (0, validateRequest_1.default)(expenditure_validation_1.ExpenditureValidation.createExpenditureZodSchema), expenditure_controller_1.ExpenditureController.createExpenditure);
router.patch('/:id', expenditure_controller_1.ExpenditureController.updateExpenditure);
router.get('/:id', expenditure_controller_1.ExpenditureController.getExpendituresByUser);
router.get('/getExpenditureByMessId/:id', expenditure_controller_1.ExpenditureController.getExpendituresByMessId);
// router.get('/getExpendituresByMessIdAndDate/:id', ExpenditureController.getExpendituresByMessIdAndDate);
// router.delete('/:id', auth(ENUM_USER_ROLE.SELLER), ExpenditureController.deleteCow);
// router.patch(
//   '/:id',
//   auth(ENUM_USER_ROLE.SELLER),
//   validateRequest(ExpenditureValidation.updateExpenditureZodSchema),
//   ExpenditureController.updateCow
// );
exports.ExpenditureRoutes = router;
