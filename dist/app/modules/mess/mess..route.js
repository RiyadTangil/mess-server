"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MessRoutes = void 0;
const express_1 = __importDefault(require("express"));
// import { ENUM_USER_ROLE } from '../../../enums/user';
// import auth from '../../middlewares/auth';
// import validateRequest from '../../middlewares/validateRequest';
// import { MessValidation } from './mess..validation';
const mess_controller_1 = require("./mess.controller");
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const mess__validation_1 = require("./mess..validation");
const router = express_1.default.Router();
router.post('/create-mess', (0, validateRequest_1.default)(mess__validation_1.MessValidation.createMessZodSchema), mess_controller_1.MessController.createMess);
router.get('/:id', mess_controller_1.MessController.getSingleMess);
// router.get(
//   '/',
//   auth(ENUM_USER_ROLE.SELLER, ENUM_USER_ROLE.ADMIN),
//   CowController.getAllCows
// );
// router.delete('/:id', auth(ENUM_USER_ROLE.SELLER), CowController.deleteCow);
router.patch('/:id', (0, validateRequest_1.default)(mess__validation_1.MessValidation.UpdateMessZodSchema), mess_controller_1.MessController.updateMess);
exports.MessRoutes = router;
