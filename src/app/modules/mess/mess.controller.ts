import { Request, RequestHandler, Response } from 'express';
import { MessService } from './mess..service';
// import httpStatus from 'http-status';
// import { paginationFields } from '../../../constants/pagination';
import catchAsync from '../../../shared/catchAsync';
// import pick from '../../../shared/pick';
import sendResponse from '../../../shared/sendResponse';
// import { cowFilterableFields } from './mess..constant';
// import { IMess } from './mess..interface';

import httpStatus from 'http-status';
import config from '../../../config';
import { ILoginUserResponse } from '../auth/auth.interface';
import { IMess } from './mess..interface';
const createMess: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const { ...messData } = req.body;

    const result = await MessService.createMess(messData);
    // const { refreshToken } = result;

    // set refresh token into cookie
    const cookieOptions = {
      secure: config.env === 'production',
      httpOnly: true,
    };

    res.cookie('refreshToken', result?.refreshToken, cookieOptions);

    sendResponse<ILoginUserResponse>(res, {
      statusCode: 200,
      success: true,
      message: 'User logged in successfully !',
      data: result,
    });

    // sendResponse<IMess>(res, {
    //   statusCode: httpStatus.OK,
    //   success: true,
    //   message: 'cow created successfully!',
    //   data: result,
    // });
  }
);
// const getAllCows = catchAsync(async (req: Request, res: Response) => {
//   const filters = pick(req.query, cowFilterableFields);
//   const paginationOptions = pick(req.query, paginationFields);

//   const result = await CowService.getAllCows(filters, paginationOptions);

//   sendResponse<ICow[]>(res, {
//     statusCode: httpStatus.OK,
//     success: true,
//     message: 'Cows retrieved successfully !',
//     meta: result.meta,
//     data: result.data,
//   });
// });

const getSingleMess = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;

  const result = await MessService.getSingleMess(id);

  sendResponse<IMess>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Mess retrieved successfully !',
    data: result,
  });
});

const updateMess = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const updatedData = req.body;

  const result = await MessService.updateMess(id, updatedData);

  sendResponse<IMess>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Mess updated successfully !',
    data: result,
  });
});
// const deleteCow = catchAsync(async (req: Request, res: Response) => {
//   const id = req.params.id;

//   const result = await CowService.deleteCow(id);

//   sendResponse<ICow>(res, {
//     statusCode: httpStatus.OK,
//     success: true,
//     message: 'Cow deleted successfully !',
//     data: result,
//   });
// });

export const MessController = {
  createMess,
  // getAllCows,
  getSingleMess,
  updateMess,
  // updateCow,
  // deleteCow,
};
