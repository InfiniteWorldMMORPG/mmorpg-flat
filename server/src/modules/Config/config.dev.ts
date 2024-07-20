import type { Config } from './@types';

export const config: Config = <const>{
  isProdMode: false,
  logLevel: 0,
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
};
