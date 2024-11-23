import type { Express, Request, Response } from 'express';
import type { Server } from 'node:http';

import type { User } from '#modules/StorageUser/@types';
import type { AuthController } from '#modules/ControllerAuth';
import type { GlobalMapController } from '#modules/ControllerGlobalMap';
import type { Logger } from '#modules/Logger';
import type { Config } from '#modules/Config';

export interface MiddlewareMap {
  auth(request: Request, response: Response): Promise<User | null>;
}

export interface TransportHTTPContext {
  providers: {
    config: Config;
    logger: Logger;
    authController: AuthController;
    globalMapController: GlobalMapController;
  };
  server: Server;
  app: Express;
  middlewareMap: MiddlewareMap;
}
