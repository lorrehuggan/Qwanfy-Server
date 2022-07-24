import { Request, Response, NextFunction } from 'express';

class BaseError extends Error {
  statusCode: number;
  constructor(message: string, statusCode: number) {
    super(message);
    Object.setPrototypeOf(this, BaseError.prototype);
    this.name = Error.name;
    this.statusCode = statusCode;
    Error.captureStackTrace(this);
  }
}

export class NotFoundError extends BaseError {
  propertyName: string;
  constructor(propertyName: string) {
    super(`property '${propertyName}' not found`, 404);
    this.propertyName = propertyName;
  }
}

export class ValidationError extends BaseError {
  propertyName: string;
  constructor(propertyName: string) {
    super(`property '${propertyName}' is invalid`, 404);
    this.propertyName = propertyName;
  }
}

export const asyncHandler =
  (fn: any) => (req: Request, res: Response, next: NextFunction) =>
    Promise.resolve(fn(req, res, next)).catch(next);

export default BaseError;
