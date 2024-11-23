import {
  type Request,
  type Response,
} from 'express';

import { SignUpInputDTOSchema } from '#lib/dto';

import { TransportHTTPContext } from '../@types';
import { UnknownError } from '../errors';

export const signUpHandler = async (context: TransportHTTPContext, request: Request, response: Response): Promise<void> => {
  console.log(request.body);
  const { success, data, error } = SignUpInputDTOSchema.safeParse(request.body);

  if (!success) {
    context.providers.logger.error(['TransportHTTP', 'signUpHandler'], error.toString());
    response.status(400).send({ error: 'Bad Request' });
    return;
  }

  const result = await context.providers.authController.signUp(data);
  switch (true) {
    case result instanceof UnknownError:
      response.status(500).send({ error: 'Server side error' });
      return;

    default:
      response.status(200).send(result);
      return;
  }
};
