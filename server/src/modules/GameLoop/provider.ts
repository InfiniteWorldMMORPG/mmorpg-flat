import { type InjectionToken, provide } from '#lib/DI';


export const StorageInjectionToken: InjectionToken<Storage> = {
  id: Symbol('Storage'),
  guard(value: unknown): value is Storage {
    return typeof value === 'object' && value != null && 'registerMigrations' in value && 'connection' in value;
  },
};

export const provider = async (): Promise<void> => {



  provide(StorageInjectionToken, );
};
