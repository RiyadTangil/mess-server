"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MealRoutes = void 0;
const express_1 = __importDefault(require("express"));
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const meal_validation_1 = require("./meal.validation");
const meal_controller_1 = require("./meal.controller");
const router = express_1.default.Router();
router.post('/create-meal', (0, validateRequest_1.default)(meal_validation_1.MealValidation.createMealZodSchema), meal_controller_1.MealController.createMeal);
router.patch('/:id', meal_controller_1.MealController.updateMeal);
router.get('/:id', meal_controller_1.MealController.getMealsByUser);
router.get('/getMealsByMessId/:id', meal_controller_1.MealController.getMealsByMessId);
router.get('/getMealsByMessIdAndDate/:id', meal_controller_1.MealController.getMealsByMessIdAndDate);
// router.delete('/:id', auth(ENUM_USER_ROLE.SELLER), MealController.deleteCow);
// router.patch(
//   '/:id',
//   auth(ENUM_USER_ROLE.SELLER),
//   validateRequest(MealValidation.updateMealZodSchema),
//   MealController.updateCow
// );
exports.MealRoutes = router;
