import { Schema, model } from 'mongoose';
import { IMess, MessModel } from './mess..interface';

export const MessSchema = new Schema<IMess, MessModel>(
  {
    name: {
      type: String,
      required: true,
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
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  }
);

export const Mess = model<IMess, MessModel>('Mess', MessSchema);
