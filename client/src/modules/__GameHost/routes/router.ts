import { createRouter, createWebHistory } from 'vue-router';

import HomeRoute from './HomeRoute.vue';
import GameRoute from './GameRoute.vue';

export const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeRoute,
    },
    {
      path: '/game',
      name: 'game',
      component: GameRoute,
    },
  ],
});
