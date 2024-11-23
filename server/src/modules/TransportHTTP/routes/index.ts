import { TransportHTTPContext } from '../@types';

import { applyGlobalIntention } from './applyGlobalIntention';
import { signInHandler } from './signInHandler';
import { signUpHandler } from './signUpHandler';
import { whoAmIHandler } from './whoAmIHandler';

export const registerRoutes = (context: TransportHTTPContext) => {
  context.app.get('/whoami', whoAmIHandler.bind(null, context));
  context.app.post('/sign-in', signInHandler.bind(null, context));
  context.app.post('/sign-up', signUpHandler.bind(null, context));

  context.app.post('/apply-global-intention', applyGlobalIntention.bind(null, context));
};
