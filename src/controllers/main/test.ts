import { NextFunction, Request, Response } from 'express';
import { data } from '../../lib/mockdata';

export const testController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  res.send(data);
};
