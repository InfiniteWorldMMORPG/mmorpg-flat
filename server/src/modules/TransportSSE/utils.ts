import type { IncomingMessage, ServerResponse } from 'node:http';

import type { UUIDv4 } from '#lib/utils';

import type { ListenerStorage, TransportSSEContext } from './@types';

export const sendHandshake = (res: ServerResponse): void => {
  res.writeHead(200, {
    'Content-Type': 'text/event-stream',
    'Cache-Control': 'no-cache',
    Connection: 'keep-alive'
  });
  res.write('retry: 1000\n');
};

export const sendNotAuthorized = (res: ServerResponse): void => {
  res.writeHead(401);
  res.end();
};

export const sendNotFound = (res: ServerResponse): void => {
  res.writeHead(404);
  res.end();
};

export const listen = (listeners: ListenerStorage, userId: UUIDv4, channel: ServerResponse): void => {
  listeners[userId] = {
    listenEvents: new Set(),
    channel,
  };
  channel.on('close', () => {
    delete listeners[userId];
  });
};

export const sendRandomThenClose = (res: ServerResponse, times: number): void => {
  res.write('data: ' + (Math.floor(Math.random() * 1000) + 1) + '\n\n');
  if (times > 0) {
    setTimeout(() => sendRandomThenClose(res, times - 1), Math.random() * 3000);
  } else {
    res.end();
  }
};

export const requestListener = async (context: TransportSSEContext, req: IncomingMessage, res: ServerResponse): Promise<void> => {
  // get URI path
  const url = new URL(req.url ?? '', context.host);
  const pathname = url.pathname;

  const authToken = req.headers.authorization?.replace('Brearer ', '') ?? '';
  const user = await context.providers.authController.whoAmI(authToken);

  if (user === null) {
    sendNotAuthorized(res);
    return;
  }

  switch (pathname) {
    case '/random': {
      sendHandshake(res);
      sendRandomThenClose(res, 10);
      break;
    }
    case '/connect': {
      sendHandshake(res);
      listen(context.listeners, user.id, res);
      break;
    }
    default: {
      sendNotFound(res);
      return;
    }
  }
};
