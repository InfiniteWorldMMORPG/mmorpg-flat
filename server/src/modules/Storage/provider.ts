import { type InjectionToken, provide } from '#lib/DI';

type DBConnection = unknown;

interface Migration {
  id: number; // result of Date.now() at file creation time
  name: string;
  up(connection: DBConnection): Promise<void>;
  down(connection: DBConnection): Promise<void>;
}

interface Storage {
  registerMigrations(migrationList: Migration[]): void;
  migrate(): Promise<void>;
  rollback(): Promise<void>;
  connection: DBConnection;
}

export const StorageInjectionToken: InjectionToken<Storage> = {
  id: Symbol('Storage'),
  guard(value: unknown): value is Storage {
    return typeof value === 'object' && value != null && 'registerMigrations' in value && 'connection' in value;
  },
};

export const provider = async (): Promise<void> => {

  // storage.registerMigrations();

  const connection: DBConnection = null;

  const globalMigrationList = [];

  const storage = {
    registerMigrations(migrationList: Migration[]) {
      globalMigrationList.push(...migrationList);
    },
    migrate(): Promise<void> {
      return Promise.resolve();
    },
    rollback(): Promise<void> {
      return Promise.resolve();
    },
    get connection() {
      return connection;
    }
  };

  provide(StorageInjectionToken, storage);
};
