import express from 'express';

import { CowRoutes } from '../modules/cow/cow.route';
// import { OrdezrRoutes } from '../modules/order/order.route';
import { BasicRoute, UserRoutes } from '../modules/user/user.route';
import { MessRoutes } from '../modules/mess/mess..route';
import { AuthRoutes } from '../modules/auth/auth.route';
import { MealRoutes } from '../modules/meal/meal.route';
import { ExpenditureRoutes } from '../modules/expenditure/expenditure.route';

const router = express.Router();

const moduleRoutes = [
  {
    path: '/auth',
    route: AuthRoutes,
  },
  {
    path: '/mess',
    route: MessRoutes,
  },
  {
    path: '/expenditure',
    route: ExpenditureRoutes,
  },
  {
    path: '/meal',
    route: MealRoutes,
  },
  {
    path: '/basic',
    route: BasicRoute,
  },
  {
    path: '/users',
    route: UserRoutes,
  },
  // {
  //   path: '/orders',
  //   route: OrderRoutes,
  // },
  {
    path: '/cows',
    route: CowRoutes,
  },
];

moduleRoutes.forEach(route => router.use(route.path, route.route));
export default router;
