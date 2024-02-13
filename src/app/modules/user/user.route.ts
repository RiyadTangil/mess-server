import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { UserController } from './user.controller';
import { UserValidation } from './user.validation';
import { ENUM_USER_ROLE } from '../../../enums/user';
import auth from '../../middlewares/auth';
const router = express.Router();
const authRouter = express.Router();
const basicRouter = express.Router();

router.post(
  '/signup',

  validateRequest(UserValidation.createUserZodSchema),
  UserController.createUser
);

router.get('/:id', auth(ENUM_USER_ROLE.ADMIN), UserController.getSingleUser);
basicRouter.get('/', UserController.initialRoute);
router.get('/', UserController.getAllUsers);

router.delete('/:id', UserController.deleteUser);

router.patch(
  '/:id',
  validateRequest(UserValidation.createUserZodSchema),
  UserController.updateUser
);

export const UserRoutes = router;
export const UserAuthRouters = authRouter;
export const BasicRoute = basicRouter;
