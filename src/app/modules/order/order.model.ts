import { Schema, model } from 'mongoose';

import { IOrder } from './order.interface';

const academicSemesterSchema = new Schema<IOrder>(
  {
    buyer: {
      type: Schema.Types.ObjectId, 
      ref: 'User',
      required: true,
    },
    cow: {
      type: Schema.Types.ObjectId, 
      ref: 'cow',
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

export const Order = model<IOrder>('order', academicSemesterSchema);
