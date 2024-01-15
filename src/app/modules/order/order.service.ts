
import mongoose, { SortOrder } from 'mongoose';
import { paginationHelpers } from '../../../helpers/paginationHelper';
import { IGenericResponse } from '../../../interfaces/common';
import { IPaginationOptions } from '../../../interfaces/pagination';

import { IOrder } from './order.interface';
import { Order } from './order.model';
import { User } from '../user/user.model';
import { Cow } from '../cow/cow.model';
import ApiError from '../../../errors/ApiError';
import httpStatus from 'http-status';
import { IUser } from '../user/user.interface';

const createOrder = async (payload: IOrder): Promise<IOrder> => {
  const session = await mongoose.startSession();
  let newOrder = null;
  try {
    session.startTransaction();
    const buyerInfo = await User.findOne({ _id: payload.buyer });
    const cowInfo = await Cow.findOne({ _id: payload.cow }).populate('seller');

    if (cowInfo?.label !== 'for sale') {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Cow sold out');
    } else if (buyerInfo?.budget && buyerInfo?.budget < cowInfo?.price) {
      throw new ApiError(
        httpStatus.BAD_REQUEST,
        "You don't have enough Budget"
      );
    } else {
      const labelUpdate = { label: 'sold out' };
      const newCow = await Cow.findOneAndUpdate(
        { _id: payload.cow },
        labelUpdate,
        { session }
      );

      if (!newCow) {
        throw new ApiError(
          httpStatus.BAD_REQUEST,
          'Failed to perform order request'
        );
      }
      const newBudget = buyerInfo?.budget
        ? { budget: buyerInfo?.budget - cowInfo?.price }
        : {};
      const newBuyer = await User.findOneAndUpdate(
        { _id: payload.buyer },
        newBudget,
        { session }
      );

      if (!newBuyer) {
        throw new ApiError(
          httpStatus.BAD_REQUEST,
          '2Failed to perform order request'
        );
      }
      const seller=cowInfo.seller as IUser 
      const sellerBudget = { budget: seller?.budget + cowInfo?.price };
      const newSeller = await User.findOneAndUpdate(
        { _id:seller._id ? seller._id : null },
        sellerBudget,
        { session }
      );

      if (!newSeller) {
        throw new ApiError(
          httpStatus.BAD_REQUEST,
          'Failed to perform order request'
        );
      }
      const order = await Order.create(payload);
      newOrder = order;

      if (!order) {
        throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to create order');
      }
      await session.commitTransaction();
      await session.endSession();
    }
  } catch (error) {
    await session.abortTransaction();
    await session.endSession();
    throw error;
  }

  return newOrder;
};

const getAllOrders = async (
  paginationOptions: IPaginationOptions
): Promise<IGenericResponse<IOrder[]>> => {
  const { page, limit, skip, sortBy, sortOrder } =
    paginationHelpers.calculatePagination(paginationOptions);

  const sortConditions: { [key: string]: SortOrder } = {};

  if (sortBy && sortOrder) {
    sortConditions[sortBy] = sortOrder;
  }

  const result = await Order.find({})
    .sort(sortConditions)
    .skip(skip)
    .limit(limit);

  const total = await Order.countDocuments();

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};

export const OrderService = {
  createOrder,
  getAllOrders,
};
