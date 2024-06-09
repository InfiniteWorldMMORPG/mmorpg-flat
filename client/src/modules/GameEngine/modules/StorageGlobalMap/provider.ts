import { type InjectionToken, provide } from '#lib/DI';
import { typeKey } from '#lib/utils';

import { GlobalMapRepositoryTypeSymbol } from './constants';
import { getGlobalMapRepository, type GlobalMapRepository } from './repository';

export const GlobalMapRepositoryInjectionToken: InjectionToken<GlobalMapRepository> = {
  id: Symbol(GlobalMapRepositoryTypeSymbol),
  guard(value: unknown): value is GlobalMapRepository {
    return typeof value === 'object' && value != null && typeKey in value && value[typeKey] === GlobalMapRepositoryTypeSymbol;
  },
};

export const provider = async (): Promise<void> => {

  // storage.registerMigrations();

  const repository = getGlobalMapRepository(/* storage */);

  provide(GlobalMapRepositoryInjectionToken, repository);
};
