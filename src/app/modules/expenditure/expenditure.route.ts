import express from 'express';
import validateRequest from '../../middlewares/validateRequest';

import { ExpenditureValidation } from './expenditure.validation';
import { ExpenditureController } from './expenditure.controller';
const router = express.Router();

router.post(
  '/create-expenditure',
  validateRequest(ExpenditureValidation.createExpenditureZodSchema),
  ExpenditureController.createExpenditure
);
router.patch('/:id', ExpenditureController.updateExpenditure);
router.get('/:id', ExpenditureController.getExpendituresByUser);
router.get('/getExpenditureByMessId/:id', ExpenditureController.getExpendituresByMessId);
// router.get('/getExpendituresByMessIdAndDate/:id', ExpenditureController.getExpendituresByMessIdAndDate);

// router.delete('/:id', auth(ENUM_USER_ROLE.SELLER), ExpenditureController.deleteCow);

// router.patch(
//   '/:id',
//   auth(ENUM_USER_ROLE.SELLER),
//   validateRequest(ExpenditureValidation.updateExpenditureZodSchema),
//   ExpenditureController.updateCow
// );

export const ExpenditureRoutes = router;
