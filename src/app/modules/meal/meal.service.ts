/* eslint-disable @typescript-eslint/no-explicit-any */
import { startSession } from 'mongoose';

import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';
import { IMealChoice } from './meal.interface';
import { MealChoice } from './meal.model';
import { User } from '../user/user.model';
import { IUser } from '../user/user.interface';
import { Mess } from '../mess/mess..model';
import { IMess } from '../mess/mess..interface';

const createMeal = async (meal: IMealChoice): Promise<IMealChoice | null> => {
  const session = await startSession();

  try {
    session.startTransaction();

    // Create the user within the transaction
    const newMeal = await MealChoice.create([meal], { session });
    if (!newMeal) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to create meal');
    }

    // Update the Mess model to include the created user's _id in the users array

    await User.findByIdAndUpdate(
      meal.user,
      { $push: { meals: newMeal[0]._id } },
      { session }
    );

    await session.commitTransaction();
    session.endSession();

    return newMeal[0];
  } catch (error) {
    await session.abortTransaction();
    session.endSession();

    // Handle errors appropriately

    throw new ApiError(
      httpStatus.INTERNAL_SERVER_ERROR,
      'Internal Server Error'
    );
  }
};

const getMealsByUser = async (id: string): Promise<IUser | null> => {
  const result = await User.findOne({ _id: id }).populate('meals');

  return result;
};
const getMealsByMessIdAndDate = async (
  id: string,
  date: any
): Promise<IMess | null> => {
  const mess = await Mess.findOne({ _id: id }).populate({
    path: 'users',
    populate: {
      path: 'meals',
      match: { date: { $eq: date } },
    },
  });

  return mess;
};
const getMealsByMessId = async (id: string): Promise<IMess | null> => {
  const mess = await Mess.findOne({ _id: id }).populate({
    path: 'users',
    populate: {
      path: 'meals',
    },
  });

  return mess;
};

const updateMeal = async (
  id: string,
  payload: Partial<IMealChoice>
): Promise<IMealChoice | null> => {
  const isExist = await MealChoice.findOne({ _id: id });

  if (!isExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Meal not found !');
  }

  const { ...MealData } = payload;

  const updatedMealData: Partial<IMealChoice> = { ...MealData };

  const result = await MealChoice.findOneAndUpdate(
    { _id: id },
    updatedMealData,
    {
      new: true,
    }
  );
  return result;
};

// const deleteMeal = async (id: string): Promise<IMeal | null> => {
//   const result = await Meal.findByIdAndDelete({ _id: id }).populate('user');
//   return result;
// };

export const MealService = {
  createMeal,
  getMealsByUser,
  updateMeal,
  getMealsByMessId,
  getMealsByMessIdAndDate
  // getMealsByUserId,
  // getSingleMeal,
  // updateMeal,
  // deleteMeal,
};
