import { Schema, model } from 'mongoose';
import { IMealChoice } from './cow.interface';
// import { breed, categories, label, location } from './cow.constant';
// import { CowModel, ICow } from './cow.interface';

// export const CowSchema = new Schema<ICow, CowModel>(
//   {
//     name: {
//       type: String,
//       required: true,
//     },
//     age: {
//       type: Number,
//       required: true,
//     },
//     price: {
//       type: Number,
//       required: true,
//     },
//     weight: {
//       type: Number,
//       required: true,
//     },
//     location: {
//       type: String,
//       enum: [...location],
//     },
//     breed: {
//       type: String,
//       enum: [...breed],
//     },
//     label: {
//       type: String,
//       enum: [...label],
//     },
//     category: {
//       type: String,
//       enum: [...categories],
//     },
//     seller: {
//       type: Schema.Types.ObjectId, // academicSemester --> _id
//       ref: 'User',
//       required: true,
//     },
//   },
//   {
//     timestamps: true,
//     toJSON: {
//       virtuals: true,
//     },
//   }
// );

// export const Cow = model<ICow, CowModel>('Cow', CowSchema);
const MealChoiceSchema = new Schema<IMealChoice>(
  {
    choices: {
      breakfast: { type: Number, required: true },
      lunch: { type: Number, required: true },
      dinner: { type: Number, required: true },
    },
    date: { type: String, required: true },
    user: {
      type: Schema.Types.ObjectId, // academicSemester --> _id
      ref: 'User',
      required: true,
    },
    mess: {
      type: Schema.Types.ObjectId, // academicSemester --> _id
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
