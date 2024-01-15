import { Types } from 'mongoose';
import { Model } from 'mongoose';
import { IUser } from '../user/user.interface';
import { ICow } from '../cow/cow.interface';

export type IAcademicSemesterMonths =
  | 'January'
  | 'February'
  | 'March'
  | 'April'
  | 'May'
  | 'June'
  | 'July'
  | 'August'
  | 'September'
  | 'October'
  | 'November'
  | 'December';

export type IAcademicSemesterTitles = 'Autumn' | 'Summer' | 'Fall';

export type IAcademicSemesterCodes = '01' | '02' | '03';

export type IOrder = {
  buyer: Types.ObjectId | IUser;
  cow: Types.ObjectId | ICow;
};

export type OrderModel = Model<IOrder>;

export type IAcademicSemesterFilters = {
  searchTerm?: string;
};
