import { Request, RequestHandler, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { IMealChoice } from './meal.interface';
import { MealService } from './meal.service';
import { IUser } from '../user/user.interface';
import { IMess } from '../mess/mess..interface';
const createMeal: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const { ...MealData } = req.body;
    const result = await MealService.createMeal(MealData);

    sendResponse<IMealChoice>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Meals created successfully!',
      data: result,
    });
  }
);


const getSingleMealByMessId = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;

  const result = await MealService.getSingleMealByMessId(id);

  sendResponse<IMess>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Meals retrieved successfully !',
    data: result,
  });
});
const getMealsByUser = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;

  const result = await MealService.getMealsByUser(id);

  sendResponse<IUser>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Meals retrieved successfully !',
    data: result,
  });
});

const updateMeal = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const updatedData = req.body;

  const result = await MealService.updateMeal(id, updatedData);

  sendResponse<IMealChoice>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Meals updated successfully !',
    data: result,
  });
});
const deleteMeal = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;

  const result = await MealService.deleteMeal(id);

  sendResponse<IMealChoice>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Meals deleted successfully !',
    data: result,
  });
});

export const MealController = {
  createMeal,
  getSingleMealByMessId,
  getMealsByUser,
  updateMeal,
  deleteMeal,
};
