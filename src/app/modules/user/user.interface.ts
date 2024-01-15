/* eslint-disable no-unused-vars */
import { Types } from 'mongoose';
import { Model } from 'mongoose';
import { IMess } from '../mess/mess..interface';
type UserName = {
  firstName: string;
  lastName: string;
};

export type IUser = {
  id: string;
  role: string;
  password: string;
  name: string;
  number: string;
  needsPasswordChange: boolean;
  passwordChangedAt?: Date;
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
