import { inject } from '#lib/DI';
import { typeKey } from '#lib/utils';

import type { User } from '#ge-modules/StorageUser/@types';
import { UserRepositoryInjectionToken } from '#ge-modules/StorageUser';

import { AuthControllerTypeSymbol } from './constants';

const whoAmI = async (token: string): Promise<User | null> => {
  const userStorage = inject(UserRepositoryInjectionToken);
  return userStorage.getUserById('c92f224d-6216-45ff-a519-5e18fd5b486e');
};

export const getAuthController = () => {
  return <const>{
    [typeKey]: AuthControllerTypeSymbol,
    whoAmI,
  };
};

export type AuthController = ReturnType<typeof getAuthController>;
