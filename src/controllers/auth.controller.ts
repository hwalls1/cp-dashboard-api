import { NextFunction, Request, Response } from 'express';
import { findUserByEmail } from '../services/user.service';
import {
  findOrCreateSession,
  findSessionById,
  updateSessionById,
} from '../services/auth.service';
import { signToken, verifyJwt } from '../utils/jwt';
import createAppError, { HttpCode } from '../utils/appError';
import { findUserById } from '../services/user.service';
import log from '../utils/logger';
import config from 'config';

export const loginHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, password } = req.body;

    // make sure user exists
    const user = await findUserByEmail(email);

    // user does not exist
    if (!user) {
      log.error(`Could not log in user with ${email}, user does not exist.`);
      return next(
        createAppError(
          HttpCode.BAD_REQUEST,
          'Invalid email or password, please try with valid credentials'
        )
      );
    }

    const isValid = await user.comparePasswords(password, user.password);

    // user entered an invalid password
    if (!isValid) {
      log.error(`Could not log in ${email}, User password was incorrect.`);
      return next(
        createAppError(
          HttpCode.UNAUTHORIZED,
          `Invalid email or password, please try again`
        )
      );
    }

    // associate user with a session
    const userSession = await findOrCreateSession(user);

    // create an access token
    const accessToken = await signToken(
      user,
      userSession,
      'accessTokenPrivateKey',
      config.get('accessTokenTtl')
    );

    // create the refresh token
    const refreshToken = await signToken(
      user,
      userSession,
      'refreshTokenPrivateKey',
      config.get('refreshTokenTtl')
    );

    // send the tokens
    return res.status(HttpCode.OK).json({
      accessToken,
      refreshToken,
    });
  } catch (error: any) {
    log.error(HttpCode.INTERNAL_SERVER_ERROR, error);
    return next(
      createAppError(
        HttpCode.INTERNAL_SERVER_ERROR,
        'An error occurred while trying to log in the user'
      )
    );
  }
};

export const refreshAccessTokenHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const refreshToken = req.get('x-refresh');

    if (!refreshToken) {
      return next(
        createAppError(HttpCode.BAD_REQUEST, 'Please provide a refresh token')
      );
    }

    const decoded = verifyJwt<{ user: string; session: string }>(
      refreshToken!,
      'refreshTokenPublicKey'
    );

    if (!decoded) {
      log.error(`Error decoding token ${refreshToken}`);
      return next(
        createAppError(HttpCode.BAD_REQUEST, 'Invalid refresh token')
      );
    }

    const session = await findSessionById(Number(decoded.session));

    if (!session || !session.valid) {
      return next(
        createAppError(
          HttpCode.UNAUTHORIZED,
          'Please login before refreshing your token'
        )
      );
    }

    const user = await findUserById(Number(decoded.user));

    if (!user) {
      return next(
        createAppError(HttpCode.BAD_REQUEST, 'Please create an account first')
      );
    }

    // refresh the access token
    const accessToken = await signToken(
      user,
      session,
      'accessTokenPrivateKey',
      config.get('accessTokenTtl')
    );

    return res.status(HttpCode.OK).json({ accessToken });
  } catch (error: any) {
    log.error(HttpCode.INTERNAL_SERVER_ERROR, error);
    return next(
      createAppError(
        HttpCode.INTERNAL_SERVER_ERROR,
        'An error occurred while trying to log in the user'
      )
    );
  }
};

export const logoutHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const user = await findUserById(Number(id));

    // user does not exist
    if (!user) {
      log.error(`Could not logout user ${id}, user does not exist.`);
      return next(
        createAppError(
          HttpCode.BAD_REQUEST,
          'Invalid email or password, please try with valid credentials'
        )
      );
    }

    // set session to invalid
    await updateSessionById(Number(id));

    return res.status(HttpCode.OK).json('User has been logged out');
  } catch (error: any) {
    log.error(HttpCode.INTERNAL_SERVER_ERROR, error);
    return next(
      createAppError(
        HttpCode.INTERNAL_SERVER_ERROR,
        'An error occurred while trying to log in the user'
      )
    );
  }
};
