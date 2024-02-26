import { Schema, model } from 'mongoose';
import { IMealChoice } from './meal.interface';

const MealChoiceSchema = new Schema<IMealChoice>(
  {
    choices: {
      breakfast: { type: Number, required: true },
      lunch: { type: Number, required: true },
      dinner: { type: Number, required: true },
    },
    date: { type: String, required: true },
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

    newChoice: {
      breakfast: { type: Number, required: false },
      lunch: { type: Number, required: false },
      dinner: { type: Number, required: false },
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  }
);

export const MealChoice = model<IMealChoice>('MealChoice', MealChoiceSchema);
