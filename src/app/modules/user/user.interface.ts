/* eslint-disable no-unused-vars */
import { Types } from 'mongoose';
import { Model } from 'mongoose';
import { IMess } from '../mess/mess..interface';
import { IMealChoice } from '../meal/meal.interface';
import { IExpenditure } from '../expenditure/expenditure.interface';

export type IUser = {
  id: string;
  role: string;
  password: string;
  name: string;
  number: string;
  passwordChangedAt?: Date;
  meals: Types.ObjectId[] | IMealChoice[];
  expenditures: Types.ObjectId[] | IExpenditure[];
  deposit: { amount: number; date: string }[];
  withdraw: { amount: number; date: string }[];
  mess_id?: Types.ObjectId | IMess;
  // faculty?: Types.ObjectId | IFaculty;
  // admin?: Types.ObjectId | IAdmin;
};
export type UserModel = {
  isUserExist(
    id: string
  ): Promise<Pick<IUser, 'id' | 'password' | 'role' | 'name'>>;
  isPasswordMatched(
    givenPassword: string,
    savedPassword: string
  ): Promise<boolean>;
} & Model<IUser>;
