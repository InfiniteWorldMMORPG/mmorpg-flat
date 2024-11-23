import { inject } from '#lib/DI';
import { UserInputDTO } from '#lib/dto';
import { type UUIDv4, createUUIDv4, typeKey } from '#lib/utils';
import { CreatureRepositoryInjectionToken } from '#modules/StorageCreature';

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

const getUserByCreatureId = async (creatureId: UUIDv4): Promise<User | null> => {
  for (const user of userStorage.values()) {
    if (user.playerCreatureId === creatureId) return user;
  }
  return null;
};

const getUserByLogin = async (login: string): Promise<User | null> => {
  console.log(Array.from(userStorage.values()));
  for (const user of userStorage.values()) {
    if (user.login === login) return user;
  }
  return null;
};

const createUser = async (data: UserInputDTO): Promise<User | null> => {
  const creatureRepository = inject(CreatureRepositoryInjectionToken);
  const player = await creatureRepository.createPlayerCreature(data.nickname);
  if (player === null) return null;

  const user = {
    ...data,
    id: createUUIDv4(),
    playerCreatureId: player.id,
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  userStorage.set(user.id, user);
  return user;
};

export const getUserRepository = () => {
  init();
  return <const>{
    [typeKey]: UserRepositoryTypeSymbol,
    getUserById,
    getUserByCreatureId,
    getUserByLogin,
    createUser,
  };
};

export type UserRepository = ReturnType<typeof getUserRepository>;
