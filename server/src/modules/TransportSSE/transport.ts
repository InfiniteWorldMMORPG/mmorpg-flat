import { injectMap } from '#lib/DI';
import { type UUIDv4, isNullOrUndefined } from '#lib/utils';

import { IncomingMessage, type RequestListener, Server, ServerResponse, createServer } from 'node:http';

import { configInjectionToken } from '#modules/Config';
import { AuthControllerInjectionToken } from '#modules/ControllerAuth';
import { Logger, loggerInjectionToken } from '#modules/Logger';

import { type TransportSSEContext, SSETransportEventName } from './@types';
import { ListenerNotFoundError } from './errors';
import { requestListener } from './utils';

const init = (
  host: string,
  port: number,
  listener: RequestListener,
  logger: Logger,
): Server<typeof IncomingMessage, typeof ServerResponse> => {
  const server = createServer(listener).listen(port);
  logger.info(['SSETransport', 'init'], `Server running: ${host}\n\n`);
  return server;
};

const subscribeUserToEvent = (context: TransportSSEContext, userId: UUIDv4, event: SSETransportEventName): void | Error => {
  if (userId in context.listeners) {
    context.listeners[userId].listenEvents.add(event);
    return;
  }

  return new ListenerNotFoundError(userId);
};

const checkUserIsSubscribedToEvent = (context: TransportSSEContext, userId: UUIDv4, event: SSETransportEventName): boolean => {
  if (userId in context.listeners) {
    return context.listeners[userId].listenEvents.has(event);
  }

  return false;
};

const sendEventMessage = (
  context: TransportSSEContext,
  userId: UUIDv4,
  eventName: SSETransportEventName,
  data: string,
): void | ListenerNotFoundError => {
  const listener = context.listeners[userId];
  if (isNullOrUndefined(listener)) return new ListenerNotFoundError(userId);
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
    host: `${providers.config.sseTransport.host}:${providers.config.sseTransport.port}/`,
    providers,
    listeners: {},
  };

  const server = init(
    context.host,
    providers.config.sseTransport.port,
    requestListener.bind(null, context),
    providers.logger,
  );

  return {
    subscribeUserToEvent: subscribeUserToEvent.bind(null, context),
    checkUserIsSubscribedToEvent: checkUserIsSubscribedToEvent.bind(null, context),
    sendEventMessage: sendEventMessage.bind(null, context),
  };
};

export type TransportSSE = ReturnType<typeof build>;
