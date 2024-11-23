import {
  type Request,
  type Response,
} from 'express';

import { isNullOrUndefined } from '#lib/utils';

import { TransportHTTPContext } from '../@types';

export const whoAmIHandler = async (context: TransportHTTPContext, request: Request, response: Response): Promise<void> => {
  const token = request.headers.authorization;

  if (isNullOrUndefined(token)) {
    response.status(401).send({ error: 'Not authorized' });
    return;
  }
  console.log(token);

  const result = await context.providers.authController.whoAmI(token.slice(7));
  if (result === null) {
    response.status(401).send({ error: 'Not authorized' });
    return;
  }

  response.status(200).send(result);
};
