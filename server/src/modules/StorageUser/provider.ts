import { type InjectionToken, provide } from '#lib/DI';
import { typeKey } from '#lib/utils';

import { UserRepositoryTypeSymbol } from './constants';
import { getUserRepository, type UserRepository } from './repository';

export const UserRepositoryInjectionToken: InjectionToken<UserRepository> = {
  id: Symbol(UserRepositoryTypeSymbol),
  guard(value: unknown): value is UserRepository {
    return typeof value === 'object' && value != null && typeKey in value && value[typeKey] === UserRepositoryTypeSymbol;
  },
};

export const provider = async (): Promise<void> => {

  // storage.registerMigrations();

  const repository = getUserRepository(/* storage */);

  provide(UserRepositoryInjectionToken, repository);
};
