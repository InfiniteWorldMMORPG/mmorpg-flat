import {
  type Request,
  type Response,
} from 'express';

import { GlobalIntentionInputDTOSchema } from '#lib/dto';
import { InvalidIntentionError } from '#modules/ControllerGlobalMap/errors';

import { TransportHTTPContext } from '../@types';

// @TODO:
export const applyGlobalIntention = async (context: TransportHTTPContext, request: Request, response: Response): Promise<void> => {
  const user = await context.middlewareMap.auth(request, response);
  if (user === null) return;

  const { success, data, error } = GlobalIntentionInputDTOSchema.safeParse(request.body);

  if (!success) {
    context.providers.logger.error(['TransportHTTP', 'applyGlobalIntention'], error.toString());
    response.status(400).send({ error: 'Bad Request' });
    return;
  }

  const result = await context.providers.globalMapController.applyGlobalIntention(user, data);

  switch (true) {
    case result instanceof InvalidIntentionError:
      response.status(401).send({ error: 'Not authorized' });
      return;

    default:
      response.status(200).send(result);
      return;
  }
};
