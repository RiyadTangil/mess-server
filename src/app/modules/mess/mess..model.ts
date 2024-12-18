import { Schema, model } from 'mongoose';
import { IMess, MessModel } from './mess..interface';

export const MessSchema = new Schema<IMess, MessModel>(
  {
    name: {
      type: String,
      required: true,
    },
    meal_rate: {
      type: Number,
      required: false,
    },

    admin: {
      type: Schema.Types.ObjectId, // academicSemester --> _id
      ref: 'User',
      required: true,
    },
    users: [
      {
        type: Schema.Types.ObjectId,
        ref: 'User',
      },
    ],
    expenditures: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Expenditure',
      },
    ],
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  }
);

export const Mess = model<IMess, MessModel>('Mess', MessSchema);
