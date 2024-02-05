import { Types } from 'mongoose';


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

