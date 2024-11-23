import { sign, verify } from 'jsonwebtoken';
import bcrypt from 'bcrypt';

import { type UUIDv4, isNullOrUndefined } from '#lib/utils';

export const buildToken = (id: UUIDv4, secret: string): Promise<string | Error> => {
  return new Promise((resolve) => {
    sign(
      { id },
      secret,
      { algorithm: 'HS256', expiresIn: '1d' },
      (err, token) => {
        if (!isNullOrUndefined(err)) {
          return resolve(err);
        }

        if (isNullOrUndefined(token)) {
          return resolve(new Error('Token is empty!'));
        }

        return resolve(token);
      }
    );
  });
};

export const verifyToken = (token: string, secret: string): Promise<Record<string, unknown> | Error> => {
  return new Promise((resolve) => {
    verify(
      token,
      secret,
      (err, result) => {
        if (!isNullOrUndefined(err)) {
          return resolve(err);
        }

        if (isNullOrUndefined(result) || typeof result !== 'object') {
          return resolve(new Error('Token is invalid!'));
        }

        return resolve(result);
      }
    );
  });
};

export const buildHash = (data: string): Promise<string | Error> => {
  return new Promise((resolve) => {
    bcrypt.hash(
      data,
      10,
      (err, token) => {
        if (!isNullOrUndefined(err)) {
          return resolve(err);
        }

        return resolve(token);
      }
    );
  });
};

export const compareHash = (data: string, hash: string): Promise<boolean | Error> => {
  return new Promise((resolve) => {
    bcrypt.compare(
      data,
      hash,
      (err, result) => {
        if (!isNullOrUndefined(err)) {
          return resolve(err);
        }

        return resolve(result);
      }
    );
  });
};

