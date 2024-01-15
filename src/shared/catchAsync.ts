import { NextFunction, Request, RequestHandler, Response } from 'express';

// It is a higher-order function
// that takes a RequestHandler function (fn)
//  and returns an asynchronous function
//   that handles asynchronous operations in an Express route handler.

const catchAsync = (fn: RequestHandler) => {
  return async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      await fn(req, res, next);
    } catch (error) {
      next(error);
    }
  };
};

// const catchAsync =
//   (fn: RequestHandler) =>
//   async (req: Request, res: Response, next: NextFunction): Promise<void> => {
//     try {
//       await fn(req, res, next);
//     } catch (error) {
//       next(error);
//     }
//   };

export default catchAsync;
