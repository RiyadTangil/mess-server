import { Model, Types } from 'mongoose';
import { IUser } from '../user/user.interface';
import { IExpenditure } from '../expenditure/expenditure.interface';

export type UserName = {
  firstName: string;
  lastName: string;
  middleName: string;
};

export type Guardian = {
  fatherName: string;
  fatherOccupation: string;
  fatherContactNo: string;
  motherName: string;
  motherOccupation: string;
  motherContactNo: string;
  address: string;
};

export type LocalGuardian = {
  name: string;
  occupation: string;
  contactNo: string;
  address: string;
};

export type IMess = {
  name: string;
  number: string;
  meal_rate: number;
  password: string;
  id: string;
  users: Array<Types.ObjectId | IUser>;
  expenditures: Array<Types.ObjectId | IExpenditure>;
  admin: Types.ObjectId | IUser; // reference _id
};

export type MessModel = Model<IMess, Record<string, unknown>>;

export type ICowFilters = {
  searchTerm?: string;
  location?: string;
  price?: string;
  minPrice?: number;
  maxPrice?: number;
};
