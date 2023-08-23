import jwt, { SignOptions } from 'jsonwebtoken';
import config from 'config';
import log from './logger';
import { User } from '../entities/user.entity';
import { Session } from '../entities/session.entity';

export const signJwt = (
  payload: object,
  keyName: 'accessTokenPrivateKey' | 'refreshTokenPrivateKey',
  options: SignOptions
) => {
  const privateKey = Buffer.from(
    config.get<string>(keyName),
    'base64'
  ).toString('ascii');
  return jwt.sign(payload, privateKey, {
    ...(options && options),
    algorithm: 'RS256',
  });
};

export const verifyJwt = <T>(
  token: string,
  keyName: 'accessTokenPublicKey' | 'refreshTokenPublicKey'
): T | null => {
  try {
    const publicKey = Buffer.from(
      config.get<string>(keyName),
      'base64'
    ).toString('ascii');
    const decoded = jwt.verify(token, publicKey) as T;

    return decoded;
  } catch (error) {
    return null;
  }
};

export const signToken = async (
  user: User,
  session: Session,
  tokenName: 'accessTokenPrivateKey' | 'refreshTokenPrivateKey',
  expiration: string
) => {
  try {
    const token = signJwt({ user: user.id, session: session.id }, tokenName, {
      expiresIn: expiration,
    });

    return token;
  } catch (error: any) {
    log.error(
      `An error occurred attempting to sign the token for ${user} with ${session} and ${tokenName}`,
      error
    );
    return null;
  }
};
