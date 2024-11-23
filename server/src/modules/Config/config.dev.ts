import type { Config } from './@types';

export const config: Config = <const>{
  isProdMode: false,
  logLevel: 0,
  jwtSecret: 'secret',
  scheduleRunDelay: 5 * 60 * 1000, // 5 minutes,
  defaultTimezone: 'Europe/Moscow',
  defaultLocale: 'ru-RU',
  postgres: {
    host: 'localhost',
    port: 5432,
    db: 'mmorpg',
    user: 'main',
    password: 'main',
    runMigrations: true,
    rollbackMigrations: 0,
  },
  sseTransport: {
    port: 3000,
    host: 'http://localhost',
  },
  httpTransport: {
    port: 3001,
    host: 'http://localhost',
  },
};
