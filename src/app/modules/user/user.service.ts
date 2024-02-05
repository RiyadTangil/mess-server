import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';
import bcrypt from 'bcrypt';
import { IUser } from './user.interface';
import { User } from './user.model';
import { IGenericResponse } from '../../../interfaces/common';
import { Mess } from '../mess/mess..model';
import { startSession } from 'mongoose';
import config from '../../../config';

const createUser = async (user: IUser): Promise<IUser | null> => {
  const session = await startSession();

  try {
    session.startTransaction();
    const newHashedPassword = await bcrypt.hash(
      user.password,
      Number(config.bycrypt_salt_rounds)
    );
    user.password = newHashedPassword;
    // Create the user within the transaction
    const newUser = await User.create([user], { session });
    if (!newUser) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to create user');
    }

    // Update the Mess model to include the created user's _id in the users array
    await Mess.findByIdAndUpdate(
      user.mess_id,
      { $push: { users: newUser[0]._id } },
      { session }
    );

    await session.commitTransaction();
    session.endSession();

    return newUser[0];
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

const getAllUsers = async (): Promise<IGenericResponse<IUser[]>> => {
  const result = await User.find({});

  return {
    meta: {
      page: 0,
      limit: 0,
      total: 0,
    },
    data: result,
  };
};

const getSingleUser = async (id: string): Promise<IUser | null> => {
  const result = await User.findOne({ _id: id });
  return result;
};

const updateUser = async (
  id: string,
  payload: Partial<IUser>
): Promise<IUser | null> => {
  const isExist = await User.findOne({ _id: id });

  if (!isExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found !');
  }


  const result = await User.findOneAndUpdate({ _id: id }, payload, {
    new: true,
  });
  return result;
};

const deleteUser = async (id: string): Promise<IUser | null> => {
  const result = await User.findByIdAndDelete(id);
  return result;
};

export const UserService = {
  createUser,
  getAllUsers,
  getSingleUser,
  updateUser,
  deleteUser,
};
