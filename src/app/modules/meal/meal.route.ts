import express from 'express';
import validateRequest from '../../middlewares/validateRequest';

import { MealValidation } from './meal.validation';
import { MealController } from './meal.controller';
const router = express.Router();

router.post(
  '/create-meal',
  validateRequest(MealValidation.createMealZodSchema),
  MealController.createMeal
);
router.patch('/:id', MealController.updateMeal);
router.get('/:id', MealController.getMealsByUser);
router.get('/getMealsByMessId/:id', MealController.getSingleMealByMessId);

// router.delete('/:id', auth(ENUM_USER_ROLE.SELLER), MealController.deleteCow);

// router.patch(
//   '/:id',
//   auth(ENUM_USER_ROLE.SELLER),
//   validateRequest(MealValidation.updateMealZodSchema),
//   MealController.updateCow
// );

export const MealRoutes = router;
