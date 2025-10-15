export class AppError extends Error {
  public statusCode: number;
  public code: string;

  constructor(message: string, code = 'INTERNAL_ERROR', statusCode = 500) {
    super(message);
    this.code = code;
    this.statusCode = statusCode;
    Error.captureStackTrace(this, this.constructor);
  }
}

export const NotFoundError = (msg = 'Resource not found') =>
  new AppError(msg, 'NOT_FOUND', 404);

export const BadRequestError = (msg = 'Invalid request') =>
  new AppError(msg, 'BAD_REQUEST', 400);

