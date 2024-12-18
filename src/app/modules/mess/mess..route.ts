import express from 'express';
// import { ENUM_USER_ROLE } from '../../../enums/user';
// import auth from '../../middlewares/auth';
// import validateRequest from '../../middlewares/validateRequest';
// import { MessValidation } from './mess..validation';
import { MessController } from './mess.controller';
import validateRequest from '../../middlewares/validateRequest';
import { MessValidation } from './mess..validation';
const router = express.Router();

router.post(
  '/create-mess',
  validateRequest(MessValidation.createMessZodSchema),
  MessController.createMess
);
router.get('/:id', MessController.getSingleMess);
// router.get(
//   '/',
//   auth(ENUM_USER_ROLE.SELLER, ENUM_USER_ROLE.ADMIN),
//   CowController.getAllCows
// );

// router.delete('/:id', auth(ENUM_USER_ROLE.SELLER), CowController.deleteCow);

router.patch(
  '/:id',
  validateRequest(MessValidation.UpdateMessZodSchema),
  MessController.updateMess
);

export const MessRoutes = router;
