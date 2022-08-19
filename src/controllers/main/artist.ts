import { NextFunction, Request, Response } from 'express';
import { mockArtist } from '../../lib/mockdata';

export const artistController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  res.send(mockArtist);
};
