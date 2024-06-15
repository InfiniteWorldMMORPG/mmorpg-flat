import { type RouteRecordRaw } from 'vue-router';

import GameRoute from './GameRoute.vue';

export const buildRoutes = (mountPoint: string): readonly RouteRecordRaw[] => {
  return [
    {
      path: `${mountPoint}`,
      name: 'game',
      component: GameRoute,
    },
  ];
};
