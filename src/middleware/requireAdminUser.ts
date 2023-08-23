import { Request, Response, NextFunction } from 'express';
import log from '../utils/logger';
import createAppError, { HttpCode } from '../utils/appError';

const requireAdminUser = (req: Request, res: Response, next: NextFunction) => {
  const user = res.locals.user;

  // user does not have a valid token
  if (!user) {
    log.error('Unauthorized user attempted to get data: ', req);
    return next(
      createAppError(
        HttpCode.UNAUTHORIZED,
        `Session has expired or user doesn't exist`
      )
    );
  }
  return next();
};

export default requireAdminUser;
