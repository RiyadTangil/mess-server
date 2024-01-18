import bcrypt from 'bcrypt';
/* eslint-disable @typescript-eslint/no-explicit-any */
// import { SortOrder } from 'mongoose';
// import { paginationHelpers } from '../../../helpers/paginationHelper';
// import { IGenericResponse } from '../../../interfaces/common';
// import { IPaginationOptions } from '../../../interfaces/pagination';

import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';
// import { cowSearchableFields } from './mess..constant';

import { IMess } from './mess..interface';
import { Mess } from './mess..model';
import mongoose from 'mongoose';
import { User } from '../user/user.model';
import config from '../../../config';
import { ENUM_USER_ROLE } from '../../../enums/user';
import { jwtHelpers } from '../../../helpers/jwtHelpers';
import { Secret } from 'jsonwebtoken';
import { ILoginUserResponse } from '../auth/auth.interface';
const createMess = async (
  payload: IMess
): Promise<ILoginUserResponse | null> => {
  // create user

  const { name, number, password } = payload;
  const session = await mongoose.startSession();
  let tokenInfo = null;
  try {
    session.startTransaction();
    const isNameExist = await User.findOne({ number });
    if (isNameExist) {
      throw new ApiError(
        httpStatus.NOT_FOUND,
        'Number already  exist use a different Number'
      );
    }

    const newHashedPassword = await bcrypt.hash(
      password,
      Number(config.bycrypt_salt_rounds)
    );
    const userInfo = {
      name: 'admin name',
      number,
      password: newHashedPassword,
      role: ENUM_USER_ROLE.ADMIN,
    };
    const createdUser = await User.create(userInfo);

    if (!createdUser) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to create User');
    }
    const messInfo = {
      name,
      admin: createdUser._id,
    };
    const createdMessAccount = await Mess.create(messInfo);

    if (!createdMessAccount) {
      throw new ApiError(
        httpStatus.BAD_REQUEST,
        'Failed to create Mess Account'
      );
    }
    // 3. Update the user's mess field with the Mess account's _id
    await User.findByIdAndUpdate(createdUser._id, {
      mess_id: createdMessAccount._id,
    });

    const { _id, role } = createdUser;
    tokenInfo = { userId: _id, role, mess_id: createdMessAccount._id, name };

    await session.commitTransaction();
    await session.endSession();
  } catch (error) {
    await session.abortTransaction();
    await session.endSession();
    throw error;
  }
  const accessToken = jwtHelpers.createToken(
    tokenInfo,
    config.jwt.secret as Secret,
    config.jwt.expires_in as string
  );

  const refreshToken = jwtHelpers.createToken(
    tokenInfo,
    config.jwt.refresh_secret as Secret,
    config.jwt.refresh_expires_in as string
  );

  return {
    accessToken,
    refreshToken,
    data: tokenInfo,
  };
};
// const getAllCows = async (
//   filters: ICowFilters,
//   paginationOptions: IPaginationOptions
// ): Promise<IGenericResponse<ICow[]>> => {
//   const { searchTerm, ...filtersData } = filters;
//   const { page, limit, skip, sortBy, sortOrder } =
//     paginationHelpers.calculatePagination(paginationOptions);

//   const andConditions = [];
//   if (filtersData.maxPrice) {
//     andConditions.push({
//       price: {
//         $lte: filtersData.maxPrice,
//       },
//     });
//   }
//   if (filtersData.minPrice) {
//     const priceComparisonOperator = '$gte';
//     andConditions.push({
//       price: {
//         [priceComparisonOperator]: filtersData.maxPrice,
//       },
//     });
//   }

//   if (searchTerm) {
//     andConditions.push({
//       $or: cowSearchableFields.map(field => ({
//         [field]: {
//           $regex: searchTerm,
//           $options: 'i',
//         },
//       })),
//     });
//   }

//   if (Object.keys(filtersData).length) {
//     andConditions.push({
//       $and: Object.entries(filtersData).map(([field, value]) => ({
//         [field]: value,
//       })),
//     });
//   }

//   const sortConditions: { [key: string]: SortOrder } = {};

//   if (sortBy && sortOrder) {
//     sortConditions[sortBy] = sortOrder;
//   }
//   const whereConditions =
//     andConditions.length > 0 ? { $and: andConditions } : {};

//   const result = await Mess.find(whereConditions)
//     .sort(sortConditions)
//     .skip(skip)
//     .limit(limit);

//   const total = await Mess.countDocuments(whereConditions);

//   return {
//     meta: {
//       page,
//       limit,
//       total,
//     },
//     data: result,
//   };
// };

const getSingleMess = async (id: string): Promise<IMess | null> => {
  const result = await Mess.findOne({ _id: id }).populate({
    path: 'users',
  });

  return result;
};

// const updateCow = async (
//   id: string,
//   payload: Partial<ICow>
// ): Promise<ICow | null> => {
//   const isExist = await Mess.findOne({ _id: id });

//   if (!isExist) {
//     throw new ApiError(httpStatus.NOT_FOUND, 'Mess not found !');
//   }

//   const { ...CowData } = payload;

//   const updatedCowData: Partial<ICow> = { ...CowData };

//   /* const name ={
//     fisrtName: 'Mezba',  <----- update korar jnno
//     middleName:'Abedin',
//     lastName: 'Forhan'
//   }
// */

//   // dynamically handling

//   const result = await Mess.findOneAndUpdate({ _id: id }, updatedCowData, {
//     new: true,
//   });
//   return result;
// };

// const deleteCow = async (id: string): Promise<ICow | null> => {
//   const result = await Mess.findByIdAndDelete({ _id: id }).populate('user');
//   return result;
// };

export const MessService = {
  createMess,
  // getAllCows,
  getSingleMess,
  // updateCow,
  // deleteCow,
};
