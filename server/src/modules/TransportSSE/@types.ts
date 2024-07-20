import type { ServerResponse } from 'node:http';

import type { UUIDv4 } from '#lib/utils';

import type { AuthController } from '#modules/ControllerAuth';
import type { Logger } from '#modules/Logger';
import type { Config } from '#modules/Config';

export interface ListenerStorage {
  [userId: UUIDv4]: {
    listenEvents: Set<SSETransportEventName>;
    channel: ServerResponse;
  }
}

export interface TransportSSEContext {
  host: string;
  listeners: ListenerStorage;
  providers: {
    config: Config;
    logger: Logger;
    authController: AuthController;
  };
}

export enum SSETransportEventName {
  globalMapUpdate = 'globalMapUpdate',
  playerUpdate = 'playerUpdate',
}
