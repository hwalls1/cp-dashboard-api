export enum HttpCode {
  OK = 200,
  CREATED = 201,
  NO_CONTENT = 204,
  BAD_REQUEST = 400,
  UNAUTHORIZED = 401,
  NOT_FOUND = 404,
  CONFLICT = 409,
  INTERNAL_SERVER_ERROR = 500,
}

export interface AppError extends Error {
  statusCode: number;
  message: string;
  status: string;
  isOperational: boolean;
}

const createAppError = (statusCode = 500, message: string) => {
  const error = new Error(message) as AppError;
  error.statusCode = statusCode;
  error.status = `${statusCode}`.startsWith('4') ? 'error' : 'failure';
  error.isOperational = true;

  Error.captureStackTrace(error, createAppError);

  return error;
};

export default createAppError;
