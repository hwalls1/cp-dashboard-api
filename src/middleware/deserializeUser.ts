import { Request, Response, NextFunction } from 'express';
import { verifyJwt } from '../utils/jwt';

const deserializeUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let accessToken;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    accessToken = req.headers.authorization.split(' ')[1];
  }

  // if no bearer token
  if (!accessToken) {
    return next();
  }

  const decoded = verifyJwt(accessToken, 'accessTokenPublicKey');

  // set user id in `res.locals`
  if (decoded) {
    res.locals.user = decoded;
  }

  return next();
};

export default deserializeUser;
