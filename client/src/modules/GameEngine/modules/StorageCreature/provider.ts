import { type InjectionToken, provide } from '#lib/DI';
import { typeKey } from '#lib/utils';

import { CreatureRepositoryTypeSymbol } from './constants';
import { getCreatureRepository, type CreatureRepository } from './repository';

export const CreatureRepositoryInjectionToken: InjectionToken<CreatureRepository> = {
  id: Symbol(CreatureRepositoryTypeSymbol),
  guard(value: unknown): value is CreatureRepository {
    return typeof value === 'object' && value != null && typeKey in value && value[typeKey] === CreatureRepositoryTypeSymbol;
  },
};

export const provider = async (): Promise<void> => {

  // storage.registerMigrations();

  const repository = getCreatureRepository(/* storage */);

  provide(CreatureRepositoryInjectionToken, repository);
};
