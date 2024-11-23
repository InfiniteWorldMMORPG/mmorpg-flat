import {
  type Request,
  type Response,
} from 'express';

import { SignInInputDTOSchema } from '#lib/dto/User.dto';
import { InvalidCredentialsError } from '#modules/ControllerAuth/errors';

import { TransportHTTPContext } from '../@types';

export const signInHandler = async (context: TransportHTTPContext, request: Request, response: Response): Promise<void> => {
  console.log(request.body);
  const { success, data, error } = SignInInputDTOSchema.safeParse(request.body);

  if (!success) {
    context.providers.logger.error(['TransportHTTP', 'signInHandler'], error.toString());
    response.status(400).send({ error: 'Bad Request' });
    return;
  }

  const result = await context.providers.authController.signIn(data.login, data.password);
  switch (true) {
    case result instanceof InvalidCredentialsError:
      response.status(401).send({ error: 'Not authorized' });
      return;

    default:
      response.status(200).send(result);
      return;
  }
};
