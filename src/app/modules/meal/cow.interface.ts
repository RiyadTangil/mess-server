import { Model, Types } from 'mongoose';
import { IUser } from '../user/user.interface';

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

export type ICow = {
  name: string;
  age: number;
  price: number;
  weight: number;
  location?: string;
  breed?: string;
  label?: string;
  category?: string;
  seller: Types.ObjectId | IUser; // reference _id
};

export type CowModel = Model<ICow, Record<string, unknown>>;
export type IChoice = {
  breakfast: number;
  lunch: number;
  dinner: number;
};

export type IMealChoice = {
  choices: IChoice;
  date: string;
  mess: Types.ObjectId;
  user: Types.ObjectId;
  newChoice: IChoice;
};
export type ICowFilters = {
  searchTerm?: string;
  location?: string;
  price?: string;
  minPrice?: number;
  maxPrice?: number;
};
