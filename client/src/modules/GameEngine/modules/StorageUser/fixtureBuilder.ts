import { createUUIDv4 } from '#lib/utils';

import type { User } from './@types';

export const buildUser = (): User => {
  return {
    id: 'c92f224d-6216-45ff-a519-5e18fd5b486e',
    nickname: 'testuser',
    login: 'testuser',
    email: 'testuser@goo.gl',
    password: 'password',
    playerCreatureId: 'bbc932e0-e3fa-42ca-9446-1528c8f47e8e',
    createdAt: new Date(),
    updatedAt: new Date(),
  };
};
