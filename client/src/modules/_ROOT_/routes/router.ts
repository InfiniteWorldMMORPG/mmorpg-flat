import { createRouter, createWebHistory } from 'vue-router';

import HomeRoute from './HomeRoute.vue';

import { buildRoutes } from '#modules/GlobalLocation';

export const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeRoute,
    },
    ...buildRoutes('/game'),
  ],
});
