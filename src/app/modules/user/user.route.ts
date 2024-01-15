import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { UserController } from './user.controller';
import { UserValidation } from './user.validation';
import { ENUM_USER_ROLE } from '../../../enums/user';
import auth from '../../middlewares/auth';
const router = express.Router();
const authRouter = express.Router();
const basicRouter = express.Router();

authRouter.post(
  '/signup',
  auth(ENUM_USER_ROLE.ADMIN),
  validateRequest(UserValidation.createUserZodSchema),
  UserController.createUser
);

router.get('/:id', auth(ENUM_USER_ROLE.ADMIN), UserController.getSingleUser);
basicRouter.get('/', UserController.initialRoute);
router.get('/', auth(ENUM_USER_ROLE.ADMIN), UserController.getAllUsers);

router.delete('/:id', auth(ENUM_USER_ROLE.ADMIN), UserController.deleteUser);

router.patch(
  '/:id',
  auth(ENUM_USER_ROLE.ADMIN),
  validateRequest(UserValidation.createUserZodSchema),
  UserController.updateUser
);

export const UserRoutes = router;
export const UserAuthRouters = authRouter;
export const BasicRoute = basicRouter;