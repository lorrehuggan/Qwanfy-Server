import express, { Application, Request, Response, NextFunction } from 'express';
import { ApiError } from './Error';

export function ErrorHandler(
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) {
  console.error(err);

  if (err instanceof ApiError) {
    res.status(err.code).json({ error: err.message, data: null });
    return;
  }
  res.status(500).json('Something broke!');
}
