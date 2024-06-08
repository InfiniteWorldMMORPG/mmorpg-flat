import { ref } from 'vue';
import { defineStore } from 'pinia';

import { whoAmI } from '../api';

import type { User } from './@types/User';

export const useAuthStore = defineStore('auth', () => {
  const currentUser = ref<User | null>(null);

  whoAmI().then((user) => {
    if (user === null) {
      currentUser.value = null;
      return;
    }
    currentUser.value = {
      ...user,
      playerCreature: null,
    };
  });

  return { currentUser };
});
