import { createUUIDv4, typeKey, type UUIDv4, type Vector2 } from '#lib/utils';

import type { GlobalIntention, GlobalLocation, GlobalMap } from './@types';
import { GlobalMapRepositoryTypeSymbol } from './constants';
import { buildMap, generateLocations } from './fixtureBuilder';

const globalMapStorage: Map<UUIDv4, GlobalMap> = new Map();
const globalLocationStorage: Map<UUIDv4, GlobalLocation> = new Map();
const globalIntentionStorage: Map<UUIDv4, GlobalIntention> = new Map();

const init = () => {
  const map = buildMap([9, 9]);
  globalMapStorage.set(map.id, map);
  const locations = generateLocations(map);
  locations.forEach((location) => globalLocationStorage.set(location.id, location));
};

const getMapById = async (id: UUIDv4): Promise<GlobalMap | null> => {
  return globalMapStorage.get(id) ?? null;
};

const getNearestLocationsForMap = async (mapId: UUIDv4, coordinates: Vector2, distance: number = 2): Promise<GlobalLocation[]> => {
  const result: GlobalLocation[] = [];
  for (const [, location] of globalLocationStorage) {
    if (location.mapId === mapId
      && Math.abs(location.coordinateX - coordinates[0]) <= distance
      && Math.abs(location.coordinateY - coordinates[1]) <= distance
    ) result.push(location);
  }
  return result;
};

const createGlobalIntention = (data: Omit<GlobalIntention, 'id' | 'createdAt' | 'updatedAt'>): GlobalIntention => {
  const intention = {
    ...data,
    id: createUUIDv4(),
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  globalIntentionStorage.set(intention.id, intention);
  return intention;
};

export const getGlobalMapRepository = () => {
  init();
  return <const>{
    [typeKey]: GlobalMapRepositoryTypeSymbol,
    getMapById,
    getNearestLocationsForMap,
    createGlobalIntention,
  };
};

export type GlobalMapRepository = ReturnType<typeof getGlobalMapRepository>;
