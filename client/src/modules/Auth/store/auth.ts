import { ref } from 'vue';
import { defineStore } from 'pinia';

import type { UserFlatOutputDTO } from '#lib/dto';

import { whoAmI } from '#modules/API';

export const useAuthStore = defineStore('auth', () => {
  const currentUser = ref<UserFlatOutputDTO | null>(null);

  whoAmI().then((user) => {
    if (user === null) {
      currentUser.value = null;
      return;
    }
    currentUser.value = user;
  });

  return { currentUser };
});
