import { ref, computed, reactive } from 'vue';
import { defineStore } from 'pinia';
import type { BattleMapTemplate, GameMap } from './@types';

const battleMapTemplate: BattleMapTemplate = {
  id: '1',
  type: 'normal',
  size: [5, 5],
  locations: [
    {
      id: '1',
      coordinates: { x: 0, y: 0 },
      creatures: [],
    },
  ],
};

export const useCounterStore = defineStore('counter', () => {
  const count = ref(0);
  const doubleCount = computed(() => count.value * 2);
  function increment() {
    count.value++;
  }

  const map: GameMap = reactive({
    id: '1',
    size: [10, 10],
    locations: [
      {
        id: '1',
        coordinates: { x: 0, y: 0 },
        mapId: '1',
        battleMapTemplateId: '1',
        creatures: [],
      },
    ],
  });

  return { map, increment };
});
