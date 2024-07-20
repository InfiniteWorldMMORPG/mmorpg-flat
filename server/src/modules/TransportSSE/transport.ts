import { injectMap } from '#lib/DI';
import { type UUIDv4, isNullOrUndefined } from '#lib/utils';

import { type RequestListener, createServer } from 'node:http';

import { configInjectionToken } from '#modules/Config';
import { AuthControllerInjectionToken } from '#modules/ControllerAuth';
import { Logger, loggerInjectionToken } from '#modules/Logger';

import { type TransportSSEContext, SSETransportEventName} from './@types';
import { ErrorListenerNotFound } from './errors';
import { requestListener } from './utils';



const init = (host: string, port: number, listener: RequestListener, logger: Logger) => {
  createServer(listener).listen(port);
  logger.info(['SSETransport', 'init'], `Server running: ${host}\n\n`);
};

const subscribeUserToEvent = (context: TransportSSEContext, userId: UUIDv4, event: SSETransportEventName): void | Error => {
  if (userId in context.listeners) {
    context.listeners[userId].listenEvents.add(event);
  } else return new ErrorListenerNotFound(userId);
};

const sendEventMessage = (
  context: TransportSSEContext,
  userId: UUIDv4,
  eventName: SSETransportEventName,
  data: string,
): void | ErrorListenerNotFound => {
  const listener = context.listeners[userId];
  if (isNullOrUndefined(listener)) return new ErrorListenerNotFound(userId);
  const channel = listener.channel;

  if (!listener.listenEvents.has(eventName)) return;
  const writeIsSuccess = channel.write(`${eventName}: ${data}\n\n`);
  if (!writeIsSuccess) context.providers.logger.error(['SSETransport', 'sendEventMessage'], 'Failed to send event message');
};

export const build = () => {
  const providers = injectMap({
    config: configInjectionToken,
    logger: loggerInjectionToken,
    authController: AuthControllerInjectionToken
  });

  const context: TransportSSEContext = {
    host: `http://localhost:${providers.config.sseTransport.port}/`,
    providers,
    listeners: {},
  };

  init(
    context.host,
    providers.config.sseTransport.port,
    requestListener.bind(null, context),
    providers.logger,
  );

  return {
    subscribeUserToEvent: subscribeUserToEvent.bind(null, context),
    sendEventMessage: sendEventMessage.bind(null, context),
  };
};
