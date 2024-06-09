import { type UUIDv4, typeKey } from '#lib/utils';

import type { User } from './@types';
import { UserRepositoryTypeSymbol } from './constants';
import { buildUser } from './fixtureBuilder';

const userStorage: Map<UUIDv4, User> = new Map();

const init = () => {
  const user = buildUser();
  userStorage.set(user.id, user);
};

const getUserById = async (id: UUIDv4): Promise<User | null> => {
  return userStorage.get(id) ?? null;
};

export const getUserRepository = () => {
  init();
  return <const>{
    [typeKey]: UserRepositoryTypeSymbol,
    getUserById,
  };
};

export type UserRepository = ReturnType<typeof getUserRepository>;
