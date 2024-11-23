export interface Config {
  readonly isProdMode: boolean;
  readonly logLevel: number;
  readonly jwtSecret: string;
  readonly scheduleRunDelay: number;
  readonly defaultTimezone: string;
  readonly defaultLocale: string;
  readonly postgres: {
    host: string;
    port: number;
    db: string;
    user: string;
    password: string;
    runMigrations: boolean;
    rollbackMigrations: number;
  };
  readonly sseTransport: {
    port: number;
    host: string;
  };
  readonly httpTransport: {
    port: number;
    host: string;
  };
}
