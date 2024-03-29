"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BasicRoute = exports.UserAuthRouters = exports.UserRoutes = void 0;
const express_1 = __importDefault(require("express"));
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const user_controller_1 = require("./user.controller");
const user_validation_1 = require("./user.validation");
const user_1 = require("../../../enums/user");
const auth_1 = __importDefault(require("../../middlewares/auth"));
const router = express_1.default.Router();
const authRouter = express_1.default.Router();
const basicRouter = express_1.default.Router();
router.post('/signup', (0, validateRequest_1.default)(user_validation_1.UserValidation.createUserZodSchema), user_controller_1.UserController.createUser);
router.get('/:id', (0, auth_1.default)(user_1.ENUM_USER_ROLE.ADMIN), user_controller_1.UserController.getSingleUser);
basicRouter.get('/', user_controller_1.UserController.initialRoute);
router.get('/', user_controller_1.UserController.getAllUsers);
router.delete('/:id', user_controller_1.UserController.deleteUser);
router.patch('/:id', user_controller_1.UserController.updateUser);
exports.UserRoutes = router;
exports.UserAuthRouters = authRouter;
exports.BasicRoute = basicRouter;
