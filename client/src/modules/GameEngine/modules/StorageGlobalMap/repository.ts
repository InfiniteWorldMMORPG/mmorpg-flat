import { createUUIDv4, typeKey, type UUIDv4, type Vector2 } from '#lib/utils';

import type { GlobalIntention, GlobalLocation, GlobalMap } from './@types';
import { GlobalMapRepositoryTypeSymbol } from './constants';
import { locations, map } from './fixtureBuilder';

const globalMapStorage: Map<UUIDv4, GlobalMap> = new Map();
const globalLocationStorage: Map<UUIDv4, GlobalLocation> = new Map();
const globalIntentionStorage: Map<UUIDv4, GlobalIntention> = new Map();

const init = () => {
  globalMapStorage.set(map.id, map);
  locations.forEach((location) => globalLocationStorage.set(location.id, location));
};

const getMapById = async (id: UUIDv4): Promise<GlobalMap | null> => {
  return globalMapStorage.get(id) ?? null;
};

const getLocationById = async (id: UUIDv4): Promise<GlobalLocation | null> => {
  return globalLocationStorage.get(id) ?? null;
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

const createGlobalIntention = async (data: Omit<GlobalIntention, 'id' | 'createdAt' | 'updatedAt'>): Promise<GlobalIntention> => {
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
    getLocationById,
    getNearestLocationsForMap,
    createGlobalIntention,
  };
};

export type GlobalMapRepository = ReturnType<typeof getGlobalMapRepository>;
