import express from 'express';

import { Logger, loggerInjectionToken } from '#modules/Logger';
import { injectMap } from '#lib/DI';
import { configInjectionToken } from '#modules/Config';
import { AuthControllerInjectionToken } from '#modules/ControllerAuth';

import { MiddlewareMap, TransportHTTPContext } from './@types';
import { GlobalMapControllerInjectionToken } from '#modules/ControllerGlobalMap';
import { buildMiddlewares } from './midlewares';
import { registerRoutes } from './routes';

const init = (host: string, port: number, logger: Logger) => {
  const app = express();

  const server = app.listen(port);

  logger.info(['HTTPTransport', 'init'], `Server running: ${host}:${port}/\n\n`);

  return { app, server};
};

export const build = () => {
  const providers = injectMap({
    config: configInjectionToken,
    logger: loggerInjectionToken,
    authController: AuthControllerInjectionToken,
    globalMapController: GlobalMapControllerInjectionToken,
  });

  const { app, server } = init(
    providers.config.httpTransport.host,
    providers.config.httpTransport.port,
    providers.logger,
  );

  if (server instanceof Error) return server;

  app.use(express.json());

  const context: TransportHTTPContext = {
    providers,
    server,
    app,
    middlewareMap: {} as MiddlewareMap,
  };

  context.middlewareMap = buildMiddlewares(context);
  registerRoutes(context);

  const result = {};

  return result;
};

export type TransportHTTP = ReturnType<typeof build>;
