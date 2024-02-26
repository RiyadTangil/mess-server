import { Types } from 'mongoose';

export type IExpenditure = {
  desc?: string;
  mess: Types.ObjectId;
  user: Types.ObjectId;
  amount: number;
};
