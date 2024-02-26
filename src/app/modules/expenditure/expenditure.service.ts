/* eslint-disable @typescript-eslint/no-explicit-any */
import { startSession } from 'mongoose';

import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';
import { IMess } from '../mess/mess..interface';
import { Mess } from '../mess/mess..model';
import { IUser } from '../user/user.interface';
import { User } from '../user/user.model';
import { IExpenditure } from './expenditure.interface';
import { Expenditures } from './expenditure.model';

const createExpenditure = async (
  expenditure: IExpenditure
): Promise<IExpenditure | null> => {
  const session = await startSession();

  try {
    session.startTransaction();

    // Create the Expenditure within the transaction
    const newExpenditure = await Expenditures.create([expenditure], {
      session,
    });
    if (!newExpenditure) {
      throw new ApiError(
        httpStatus.BAD_REQUEST,
        'Failed to create Expenditure'
      );
    }

    // Update the Mess model to include the created expenditures's _id in the users array

    await User.findByIdAndUpdate(
      expenditure.user,
      { $push: { expenditures: newExpenditure[0]._id } },
      { session }
    );
    await Mess.findByIdAndUpdate(
      expenditure.mess,
      { $push: { expenditures: newExpenditure[0]._id } },
      { session }
    );

    await session.commitTransaction();
    session.endSession();

    return newExpenditure[0];
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

const getExpendituresByUser = async (id: string): Promise<IUser | null> => {
  const result = await User.findOne({ _id: id }).populate('Expenditures');

  return result;
};
const getExpendituresByMessIdAndDate = async (
  id: string,
  date: any
): Promise<IMess | null> => {
  const mess = await Mess.findOne({ _id: id }).populate({
    path: 'users',
    populate: {
      path: 'expenditures',
      match: { date: { $eq: date } },
    },
  });

  return mess;
};
const getExpendituresByMessId = async (id: string): Promise<IMess | null> => {
  const mess = await Mess.findOne({ _id: id })
    .populate({
      path: 'expenditures',
      populate: {
        path: 'user',
        select: 'name',
      },
    })
    .populate({
      path: 'users',
      select: 'name',
    })
    .select('expenditures users');

  return mess;
};

const updateExpenditure = async (
  id: string,
  payload: Partial<IExpenditure>
): Promise<IExpenditure | null> => {
  const isExist = await Expenditures.findOne({ _id: id });

  if (!isExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Expenditure not found !');
  }

  const { ...ExpenditureData } = payload;

  const updatedExpenditureData: Partial<IExpenditure> = {
    ...ExpenditureData,
  };

  const result = await Expenditures.findOneAndUpdate(
    { _id: id },
    updatedExpenditureData,
    {
      new: true,
    }
  );
  return result;
};

// const deleteExpenditure = async (id: string): Promise<IExpenditure | null> => {
//   const result = await Expenditure.findByIdAndDelete({ _id: id }).populate('user');
//   return result;
// };

export const ExpenditureService = {
  createExpenditure,
  getExpendituresByUser,
  updateExpenditure,
  getExpendituresByMessId,
  getExpendituresByMessIdAndDate,
  // getExpendituresByUserId,
  // getSingleExpenditure,
  // updateExpenditure,
  // deleteExpenditure,
};
