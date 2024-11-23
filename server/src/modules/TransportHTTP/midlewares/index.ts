import { MiddlewareMap, TransportHTTPContext } from '../@types';

import { authMiddleware } from './authMiddleware';

export const buildMiddlewares = (context: TransportHTTPContext): MiddlewareMap => {
  return {
    auth: authMiddleware.bind(null, context),
  };
};
