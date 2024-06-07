import { createUUIDv4 } from '#lib/utils';

import type { User } from './@types';

export const buildUser = (): User => {
  return {
    id: createUUIDv4(),
    nickname: 'testuser',
    login: 'testuser',
    email: 'testuser@goo.gl',
    password: 'password',
    playerCreatureId: createUUIDv4(),
    createdAt: new Date(),
    updatedAt: new Date(),
  };
};
