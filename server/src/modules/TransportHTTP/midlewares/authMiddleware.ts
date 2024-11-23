import {
  type Request,
  type Response,
} from 'express';

import { isNullOrUndefined } from '#lib/utils';
import { User } from '#modules/StorageUser/@types';
import { TokenInvalidError } from '#modules/ControllerAuth/errors';

import { TransportHTTPContext } from '../@types';

export const authMiddleware = async (context: TransportHTTPContext, request: Request, response: Response): Promise<User | null> => {
  const token = request.headers.authorization;

  if (isNullOrUndefined(token)) {
    response.status(401).send({ error: 'Not authorized' });
    return null;
  }

  const user = await context.providers.authController.getUserByToken(token);
  switch (true) {
    case user === null: {
      response.status(401).send({ error: 'Not authorized' });
      return null;
    }

    case user instanceof TokenInvalidError: {
      response.status(401).send({ error: 'Not authorized' });
      return null;
    }

    default: {
      return user;
    }
  }
};
