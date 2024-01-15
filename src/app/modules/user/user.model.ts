import { Schema, model } from 'mongoose';
import { IUser, UserModel } from './user.interface';
import bcrypt from 'bcrypt';
const userSchema = new Schema<IUser>(
  {
    // id: {
    //   type: String,
    //   required: true,
    //   unique: true,
    // },
    mess_id: {
      type: Schema.Types.ObjectId,
      ref: 'Mess',
    },

    number: {
      type: String,
      required: true,
      unique: true,
    },
    role: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    name: {
      type: String,
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
userSchema.statics.isUserExist = async function (
  number: string
): Promise<IUser | null> {
  return await User.findOne(
    { number },
    { id: 1, password: 1, role: 1, number: 1 }
  );
};

userSchema.statics.isPasswordMatched = async function (
  givenPassword: string,
  savedPassword: string
): Promise<boolean> {
  return await bcrypt.compare(givenPassword, savedPassword);
};
export const User = model<IUser, UserModel>('User', userSchema);
