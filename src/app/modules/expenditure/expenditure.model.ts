import { Schema, model } from 'mongoose';
import { IExpenditure } from './expenditure.interface';

const Expenditure = new Schema<IExpenditure>(
  {
    desc: { type: String, required: false },
    amount: { type: Number, required: true },
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    mess: {
      type: Schema.Types.ObjectId,
      ref: 'Mess',
      required: true,
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  }
);

export const Expenditures = model<IExpenditure>('Expenditure', Expenditure);
