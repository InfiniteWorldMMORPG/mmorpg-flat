import { type InjectionToken, inject, provide } from '#lib/DI';
import { configInjectionToken } from '#modules/Config';

import { Logger } from './Logger';

export const loggerInjectionToken: InjectionToken<Logger> = {
  id: Symbol('Logger'),
  guard(value: unknown): value is Logger {
    return value instanceof Logger;
  },
};

export const provider = async (): Promise<void> => {
  const config = inject(configInjectionToken);

  const logger = new Logger({ mode: config.logLevel});

  provide(loggerInjectionToken, logger);
};

