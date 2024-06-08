import { ref, computed } from 'vue';
import { defineStore } from 'pinia';

import { isNullOrUndefined } from '#lib/utils';

import type { Creature, GlobalIntention, GlobalLocation, GlobalMap, PlayerCreature } from './@types';
import { useAuthStore } from './auth';
import { subscribeOnGlobalMapUpdate, subscribeOnPlayerUpdate } from '../api';
import type { CreatureOutputDTO, GlobalLocationFlatOutputDTO, GlobalMapOutputDTO } from '#lib/dto';

export class NotAdjacentLocationError extends Error { constructor() { super('Not adjacent locations'); } }

export const isNearbyLocation = (a: GlobalLocation, b: GlobalLocation, distance: number): boolean => {
  return (Math.abs(a.coordinates[0] - b.coordinates[0]) <= distance && Math.abs(a.coordinates[1] - b.coordinates[1]) <= distance);
};

export const useGameStore = defineStore('game', () => {
  const authStore = useAuthStore();

  const playerCreature = ref<CreatureOutputDTO | null>(null);

  subscribeOnPlayerUpdate((player) => {
    playerCreature.value = player;
  });

  const globalMap = ref<GlobalMapOutputDTO | null>(null);

  subscribeOnGlobalMapUpdate((_globalMap) => {
    globalMap.value = _globalMap;
  });


  // const regenerateMovePoints = (creature: Creature): void => {
  //   const movePoints = creature.currentStats.movePoints + creature.currentStats.movePointsRegeneration;
  //   if (movePoints <= creature.maxStats.movePoints) creature.currentStats.movePoints = movePoints;
  // };


  const playerLocation = computed((): GlobalLocationFlatOutputDTO | null => {
    return playerCreature.value?.location ?? null;
  });

  // const moveCreatureToGlobalLocation = (creature: Creature, location: GlobalLocation): void | NotAdjacentLocationError => {
  //   if (!location.canMove) return;
  //   if (location.moveCost > creature.currentStats.movePoints) return;

  //   const prevLocation = globalMap.value?.locations.find((location) => location.id === creature.locationId) ?? null;

  //   if (prevLocation !== null) {
  //     if (!isNearbyLocation(prevLocation, location, 1)) return new NotAdjacentLocationError();
  //     prevLocation.creatures.splice(prevLocation.creatures.indexOf(creature), 1);
  //   }

  //   location.creatures.push(creature);
  //   creature.locationId = location.id;
  //   creature.currentStats.movePoints -= location.moveCost;
  // };

  // const getMinimapLocations = (location: GlobalLocation): GlobalLocation[] | Error => {
  //   const minimapLocations: GlobalLocation[] = [];

  //   const locations = globalMap.value?.locations ?? null;
  //   if (locations === null) return new Error('Locations is null');

  //   for (const _location of locations) {
  //     if (isNearbyLocation(location, _location, 2)) minimapLocations.push(_location);
  //   }

  //   return minimapLocations;

  // };

  // const minimapLocations = computed((): GlobalLocation[] => {
  //   const minimapLocations: GlobalLocation[] = [];

  //   const currentLocation = globalMap.value?.locations.find((location) => location.id === playerCreature.value?.locationId) ?? null;
  //   if (currentLocation === null) return [];

  //   const locations = globalMap.value?.locations ?? null;
  //   if (locations === null) return [];

  //   for (const location of locations) {
  //     if (isNearbyLocation(currentLocation, location, 2)) minimapLocations.push(location);
  //   }

  //   return minimapLocations;
  // });

  const minimapLocations = computed((): GlobalLocationFlatOutputDTO[] => {
    return globalMap.value?.locations ?? [];
  });

  const runGlobalIntention = (intention: GlobalIntention): void => {
    // const sourceCreature = allCreatures.value[intention.sourceCreatureId] ?? null;
    // if (sourceCreature === null) return;
    // const skill = skills[intention.skillId] ?? null;
    // if (skill === null) return;


    // const targetLocation = globalMap.value?.locations.find((location) => location.id === intention.targetLocationId) ?? null;
    // const targetCreature = allCreatures.value[intention.targetCreatureId ?? ''] ?? null;

    // switch (skill.slug) {
    //   case 'GlobalMove': {
    //     console.log(123, targetLocation);
    //     if (targetLocation === null) return;
    //     moveCreatureToGlobalLocation(sourceCreature, targetLocation);
    //     break;
    //   }
    //   default: {
    //     console.warn('Unknown global intention', intention);
    //     break;
    //   }
    // }

  };

  return {
    globalMap,
    playerCreature,
    minimapLocations,
    playerLocation,
    runGlobalIntention,
  };
});
