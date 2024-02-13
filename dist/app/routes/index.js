"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cow_route_1 = require("../modules/cow/cow.route");
// import { OrderRoutes } from '../modules/order/order.route';
const user_route_1 = require("../modules/user/user.route");
const mess__route_1 = require("../modules/mess/mess..route");
const auth_route_1 = require("../modules/auth/auth.route");
const meal_route_1 = require("../modules/meal/meal.route");
const router = express_1.default.Router();
const moduleRoutes = [
    {
        path: '/auth',
        route: auth_route_1.AuthRoutes,
    },
    {
        path: '/mess',
        route: mess__route_1.MessRoutes,
    },
    {
        path: '/meal',
        route: meal_route_1.MealRoutes,
    },
    {
        path: '/basic',
        route: user_route_1.BasicRoute,
    },
    {
        path: '/users',
        route: user_route_1.UserRoutes,
    },
    // {
    //   path: '/orders',
    //   route: OrderRoutes,
    // },
    {
        path: '/cows',
        route: cow_route_1.CowRoutes,
    },
];
moduleRoutes.forEach(route => router.use(route.path, route.route));
exports.default = router;
