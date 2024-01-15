import mongoose from 'mongoose';
import { IGenericErrorMessage } from '../interfaces/error';
//CastError occurs when there is a failure to cast a value to the expected data type.
//Mongoose uses casting to convert values to the specified schema types,
// and a CastError is thrown if this conversion fails.
//Here are common scenarios where CastError may occur:
// 1.Invalid ObjectId:
// 2.Incorrect Data Type in Schema:=>  age: Number,   age: 'twenty-five',
// 3.Unexpected Value for Enum: =>enum: ['admin', 'user'],  => role: 'manager',
// 4.Incorrect Date Format: =>  birthdate: Date,  =>birthdate: '2020-01-01'
const handleCastError = (error: mongoose.Error.CastError) => {
  const errors: IGenericErrorMessage[] = [
    {
      path: error.path,
      message: 'Invalid Id',
    },
  ];

  const statusCode = 400;
  return {
    statusCode,
    message: 'Cast Error',
    errorMessages: errors,
  };
};

export default handleCastError;
