import { defineStore } from 'pinia';
import { computed, ref } from 'vue';

import type { CreatureOutputDTO, GlobalIntentionInputDTO, GlobalLocationFlatOutputDTO, GlobalMapOutputDTO } from '#lib/dto';

import { refresh, sendGlobalIntentionToServer, subscribeOnGlobalMapUpdate, subscribeOnPlayerUpdate } from '../../__GameHost/api';

export const useGameStore = defineStore('game', () => {
  const playerCreature = ref<CreatureOutputDTO | null>(null);

  subscribeOnPlayerUpdate((player) => {
    playerCreature.value = player;
  });

  const globalMap = ref<GlobalMapOutputDTO | null>(null);

  subscribeOnGlobalMapUpdate((_globalMap) => {
    globalMap.value = _globalMap;
  });

  const playerLocation = computed((): GlobalLocationFlatOutputDTO | null => {
    return playerCreature.value?.location ?? null;
  });

  const minimapLocations = computed((): GlobalLocationFlatOutputDTO[] => {
    return globalMap.value?.locations ?? [];
  });

  const applyGlobalIntention = (intention: GlobalIntentionInputDTO): void => {
    sendGlobalIntentionToServer(intention);
  };

  refresh();

  return {
    globalMap,
    playerCreature,
    minimapLocations,
    playerLocation,
    applyGlobalIntention,
  };
});
