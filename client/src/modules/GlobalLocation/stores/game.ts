import { defineStore } from 'pinia';
import { computed, ref } from 'vue';

import type { CreatureOutputDTO, GlobalIntentionInputDTO, GlobalLocationFlatOutputDTO, GlobalLocationOutputDTO, GlobalMapOutputDTO } from '#lib/dto';

import { refresh, sendGlobalIntentionToServer, subscribeOnGlobalMapUpdate, subscribeOnPlayerUpdate } from '#modules/API';
import { isNullOrUndefined } from '#lib/utils';

import type { SkillBar } from './@types/SkillBar';

export const useGameStore = defineStore('game', () => {
  const playerCreature = ref<CreatureOutputDTO | null>(null);

  subscribeOnPlayerUpdate((player) => {
    playerCreature.value = player;
  });

  const globalMap = ref<GlobalMapOutputDTO | null>(null);

  subscribeOnGlobalMapUpdate((_globalMap) => {
    globalMap.value = _globalMap;
  });

  const playerLocation = computed((): GlobalLocationOutputDTO | null => {
    return playerCreature.value?.location ?? null;
  });

  const minimapLocations = computed((): GlobalLocationFlatOutputDTO[] => {
    return globalMap.value?.locations ?? [];
  });

  const skillBar = computed((): SkillBar => {
    const skillBar = {
      type: 'global',
      cells: [
        {
          id: 1,
          skill: playerCreature.value?.skills.find(({ skill }) => skill.slug === 'GlobalMove') ?? null,
        },
        {
          id: 2,
          skill: playerCreature.value?.skills.find(({ skill }) => skill.slug === 'GlobalAttack') ?? null,
        },
      ]
    };
    return skillBar;
  });

  refresh();

  const playerChangeGlobalLocation = (location: GlobalLocationFlatOutputDTO): void => {
    const player = playerCreature;
    if (isNullOrUndefined(player.value)) return;

    if (player.value.location.id === location.id) return;

    const creatureSkill = player.value.skills.find((creatureSkill) => creatureSkill.skill.slug === 'GlobalMove');
    if (isNullOrUndefined(creatureSkill)) return;

    const intention: GlobalIntentionInputDTO = {
      sourceCreatureId: player.value.id,
      targetCreatureId: null,
      targetGlobalLocationId: location.id,
      skillId: creatureSkill.skill.id,
    };

    sendGlobalIntentionToServer(intention);
  };

  return {
    globalMap,
    playerCreature,
    minimapLocations,
    playerLocation,
    skillBar,
    playerChangeGlobalLocation,
  };
});
