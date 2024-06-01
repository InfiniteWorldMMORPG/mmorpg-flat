import { ref, computed } from 'vue';
import { defineStore } from 'pinia';

import type { Creature, GlobalLocation, GlobalMap, PlayerCreature } from './@types';
import { useAuthStore } from './auth';

import { globalMap as globalMapFixture, creatures, globalMapCenterLocation } from './fixtures';
import { isNullOrUndefined } from '../utils';

export class NotAdjacentLocationError extends Error { constructor() { super('Not adjacent locations'); } }

export const isNearbyLocation = (a: GlobalLocation, b: GlobalLocation, distance: number): boolean => {
  return (Math.abs(a.coordinates[0] - b.coordinates[0]) <= distance && Math.abs(a.coordinates[1] - b.coordinates[1]) <= distance);
};

export const useGameStore = defineStore('game', () => {
  const authStore = useAuthStore();

  const playerCreature = ref<PlayerCreature | null>(null);
  function loadPlayerProfileMap() {
    playerCreature.value = creatures[authStore.currentUser.playerCreatureId] ?? null;
  }

  const globalMap = ref<GlobalMap | null>(null);
  function loadGlobalMap() {
    globalMap.value = globalMapFixture;
    const creature = playerCreature.value ?? null;
    const playerLocationId = playerCreature.value?.locationId ?? null;
    if (creature !== null && playerLocationId !== null) {
      const location = globalMap.value.locations.find(
        (location) => location.id === playerLocationId,
      );
      if (!isNullOrUndefined(location)) moveCreatureToGlobalLocation(creature, location);
    }
  }

  const init = async (): Promise<void> => {
    await Promise.resolve();
    loadPlayerProfileMap();
    loadGlobalMap();
  };

  const playerLocation = computed((): GlobalLocation => {
    const location = globalMap.value?.locations.find((location) => location.id === playerCreature.value?.locationId) ?? null;
    if (location === null) return globalMapCenterLocation;
    return location;
  });

  const moveCreatureToGlobalLocation = (creature: Creature, location: GlobalLocation): void | NotAdjacentLocationError => {
    if (!location.canMove) return;

    const prevLocation = globalMap.value?.locations.find((location) => location.id === creature.locationId) ?? null;

    if (prevLocation !== null) {
      if (!isNearbyLocation(prevLocation, location, 1)) return new NotAdjacentLocationError();
      prevLocation.creatures.splice(prevLocation.creatures.indexOf(creature), 1);
    }

    location.creatures.push(creature);
    creature.locationId = location.id;
  };

  const getMinimapLocations = (location: GlobalLocation): GlobalLocation[] | Error => {
    const minimapLocations: GlobalLocation[] = [];

    const locations = globalMap.value?.locations ?? null;
    if (locations === null) return new Error('Locations is null');

    for (const _location of locations) {
      if (isNearbyLocation(location, _location, 2)) minimapLocations.push(_location);
    }

    return minimapLocations;

  };

  const minimapLocations = computed((): GlobalLocation[] => {
    const minimapLocations: GlobalLocation[] = [];

    const currentLocation = globalMap.value?.locations.find((location) => location.id === playerCreature.value?.locationId) ?? null;
    if (currentLocation === null) return [];

    const locations = globalMap.value?.locations ?? null;
    if (locations === null) return [];

    for (const location of locations) {
      if (isNearbyLocation(currentLocation, location, 2)) minimapLocations.push(location);
    }

    return minimapLocations;
  });

  return {
    globalMap,
    playerCreature,
    minimapLocations,
    playerLocation,
    init,
    loadPlayerProfileMap,
    loadGlobalMap,
    moveCreatureToGlobalLocation,
  };
});
