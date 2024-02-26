import { Request, RequestHandler, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { IMess } from '../mess/mess..interface';
import { IUser } from '../user/user.interface';
import {  IExpenditure } from './expenditure.interface';
import { ExpenditureService } from './expenditure.service';
const createExpenditure: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const { ...ExpenditureData } = req.body;
    const result = await ExpenditureService.createExpenditure(ExpenditureData);

    sendResponse<IExpenditure>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Expenditures created successfully!',
      data: result,
    });
  }
);


const getExpendituresByMessIdAndDate = catchAsync(async (req: Request, res: Response) => {
  
  const { id } = req.params;
  const { date } = req.query;

  const result = await ExpenditureService.getExpendituresByMessIdAndDate(id,date);

  sendResponse<IMess>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Expenditures retrieved successfully !',
    data: result,
  });
});
const getExpendituresByMessId = catchAsync(async (req: Request, res: Response) => {
  
  const { id } = req.params;
  const result = await ExpenditureService.getExpendituresByMessId(id);

  sendResponse<IMess>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Expenditures retrieved successfully !',
    data: result,
  });
});
const getExpendituresByUser = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;

  const result = await ExpenditureService.getExpendituresByUser(id);

  sendResponse<IUser>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Expenditures retrieved successfully !',
    data: result,
  });
});

const updateExpenditure = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const updatedData = req.body;

  const result = await ExpenditureService.updateExpenditure(id, updatedData);

  sendResponse<IExpenditure>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Expenditures updated successfully !',
    data: result,
  });
});
// const deleteExpenditure = catchAsync(async (req: Request, res: Response) => {
//   const id = req.params.id;

//   const result = await ExpenditureService.deleteExpenditure(id);

//   sendResponse<IExpenditureChoice>(res, {
//     statusCode: httpStatus.OK,
//     success: true,
//     message: 'Expenditures deleted successfully !',
//     data: result,
//   });
// });

export const ExpenditureController = {
  createExpenditure,
  getExpendituresByMessId,
  getExpendituresByMessIdAndDate,
  getExpendituresByUser,
  updateExpenditure,
  // deleteExpenditure,
};
