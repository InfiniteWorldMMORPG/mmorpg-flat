import { ref } from 'vue';
import { defineStore } from 'pinia';

import { createUUIDv4 } from '../utils';

import type { User } from './@types/User';
import { mainPlayerCreature } from './fixtures';

export const useAuthStore = defineStore('auth', () => {
  const currentUser = ref<User>({
    id: createUUIDv4(),
    playerCreatureId: mainPlayerCreature.id,
  });

  return { currentUser };
});
