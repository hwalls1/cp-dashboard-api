import crypto from 'crypto';
import bcrypt from 'bcryptjs';
import { NextFunction, Request, Response } from 'express';
import {
  createUser,
  findUserByEmail,
  findUserById,
  getAllUsers,
  updateUser,
  deleteUser
} from '../services/user.service';
import log from '../utils/logger';
import createAppError, { HttpCode } from '../utils/appError';
import { sendEmail } from '../utils/mailer';

export const registerUserHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // Extract User info
    const { name, email, password, passwordConfirmation, role } = req.body;

    // Create a new user
    const user = await createUser({
      name,
      email: email.toLowerCase(),
      password,
      role,
    });

    log.info(`User ${user.id} was successfully created`);

    // Return 201 CREATED
    return res.status(HttpCode.CREATED).json({
      status: 'success',
      message: `Created user ${user.email}`,
      user: user,
    });
  } catch (error: any) {
    // PG specific for unique constraint violation
    if (error.code === '23505') {
      return res.status(HttpCode.CONFLICT).json({
        status: 'fail',
        message: 'User with that email already exist',
      });
    }
    log.error(HttpCode.INTERNAL_SERVER_ERROR, error);
    return next(
      createAppError(
        HttpCode.INTERNAL_SERVER_ERROR,
        'There was an issue creating the user'
      )
    );
  }
};

export const verifyUserHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id, verificationCode } = req.params;

    // find the user by id
    const user = await findUserById(Number(id));

    if (!user) {
      log.error(
        `Error verify user ${id}, verificationCode: ${verificationCode}`,
        user
      );
      return next(
        createAppError(
          HttpCode.UNAUTHORIZED,
          `There was an issue verifying the user`
        )
      );
    }

    // Check to see if they are already verified
    if (user.verified) {
      return res.status(HttpCode.BAD_REQUEST).send('User is already verified');
    }

    // Check to see if the verificationCode matches
    if (user.verificationCode === verificationCode) {
      // Mark user as verified
      user.verified = true;
      // Remove verification code
      user.verificationCode = null;

      await user.save();

      // Return 200 OK
      return res.status(HttpCode.OK).json({
        status: 'success',
        message: `User ${user.email} has been successfully verified`,
      });
    }
  } catch (error: any) {
    log.error(HttpCode.INTERNAL_SERVER_ERROR, error);
    return next(
      createAppError(
        HttpCode.INTERNAL_SERVER_ERROR,
        'There was an issue verifying the user'
      )
    );
  }
};

export const forgotPasswordHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const message =
      'If a user with that email is registered you will receive a password reset email';

    const { email } = req.body;

    const user = await findUserByEmail(email);

    if (!user) {
      log.error(`User ${email} does not exist`);
      return res
        .status(HttpCode.BAD_REQUEST)
        .send(`User ${email} does not exist`);
    }

    if (!user.verified) {
      log.error(`User ${email} not verified`);
      return res
        .status(HttpCode.BAD_REQUEST)
        .send(`Please verify ${email} first`);
    }

    // Generate and save a password reset code for the user
    const passwordResetCode = crypto.randomUUID();
    user.passwordResetCode = passwordResetCode;
    await user.save();

    // Email user the reset code
    await sendEmail({
      to: user.email,
      from: 'support@connected-performance.com',
      subject: 'Reset your password',
      text: `Password reset code: ${passwordResetCode}. Id ${user.id}`,
    });

    return res.status(HttpCode.OK).send(message);
  } catch (error: any) {
    log.error(HttpCode.INTERNAL_SERVER_ERROR, error);
    return next(
      createAppError(
        HttpCode.INTERNAL_SERVER_ERROR,
        'There was an issue ressetting the user password'
      )
    );
  }
};

export const resetPasswordHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id, passwordResetCode } = req.params;

    const { password } = req.body;

    const user = await findUserById(Number(id));

    if (
      !user ||
      !user.passwordResetCode ||
      user.passwordResetCode !== passwordResetCode
    ) {
      return next(
        createAppError(
          HttpCode.BAD_REQUEST,
          'The user or password reset code is invalid'
        )
      );
    }

    // Remove the reset code and save the new hashed password
    user.passwordResetCode = null;
    user.password = await bcrypt.hash(password, 12);

    await user.save();

    return res.status(HttpCode.OK).send('Successfully updated password');
  } catch (error: any) {
    log.error(HttpCode.INTERNAL_SERVER_ERROR, error);
    return next(
      createAppError(
        HttpCode.INTERNAL_SERVER_ERROR,
        'An error occurred while trying to reset the user password'
      )
    );
  }
};

export const getCurrentUserHandler = async (_req: Request, res: Response) => {
  // If we get here, RequireUser middleware allowed it
  // return data about user
  const id = res.locals.user.user;

  log.info(id)
  try {
    const user = await findUserById(Number(id));

    return res.status(HttpCode.OK).send({
      user: user
    });
  } catch (err: any) {
    return res.status(409).json({
      status: 'fail',
      message: 'User not found',
    });
  }
};

export async function getAllUsersHandler(
  req: Request,
  res: Response
) {
  const query = req.query;

  try {
    const users = await getAllUsers(query);

    return res.send(users);
  } catch (err: any) {
    return res.status(409).json({
      status: 'fail',
      message: 'Could not retrieve users',
      error: err,
    });
  }
}

export async function findUserHandler(
  req: Request,
  res: Response
) {
  const id = Number(req.params.id);
  log.info(`Looking for user with id: ${id}`)
  try {
    const user = await findUserById(id);

    return res.send(user);
  } catch (err: any) {
    return res.status(409).json({
      status: 'fail',
      message: 'User not found',
    });
  }
}


export async function updateUserHandler(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const user = req.body;
  const id = Number(req.params.id);

  try {
    const password = (req.body.password) ? await bcrypt.hash(req.body.password, 12) : '';
    const updatedUser = await updateUser(user, id, password);
    return res.send({
      message: 'User successfully updated',
      user: updatedUser,
    });
  } catch (err: any) {
    if (err.code === '23505') {
      return res.status(409).json({
        status: 'fail',
        message: 'Failed to update user',
      });
    }
    next(err);
  }
}

export async function deleteUserHandler(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const id = Number(req.params.id);

  try {
    await deleteUser(id);
    log.info(`User: ${id} deleted successfuly`);
    return res.send('User deleted successfully');
  } catch (error) {
    log.error(`Could not delete the user with id: ${id}`);
    return next(
      createAppError(HttpCode.BAD_REQUEST, 'Could not delete the user')
    );
  }
}

