import { CreatureRepositoryInjectionToken } from '#modules/StorageCreature';
import type { Creature } from '#modules/StorageCreature/@types';
import { UserRepositoryInjectionToken } from '#modules/StorageUser';
import type { User } from '#modules/StorageUser/@types';
import { inject } from '#lib/DI';
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

interface GlobalIntentionDependencies {
  sourceUser: User;
  sourceCreature: Creature;
  targetUser: User | null;
  targetCreature: Creature | null;
}

interface GlobalIntentionWithDependencies extends GlobalIntention, GlobalIntentionDependencies {

}

const globalIntentionTransform = {
  toGlobalIntentionWithDependencies(intention: GlobalIntention, deps: GlobalIntentionDependencies): GlobalIntentionWithDependencies {
    return {
      ...intention,
      ...deps,
    };
  },
};

const getIntentionListByTimeRange = async (start: Date, end: Date = new Date()): Promise<GlobalIntentionWithDependencies[]> => {
  const result: GlobalIntentionWithDependencies[] = [];
  const userStorage = inject(UserRepositoryInjectionToken);
  const creatureStorage = inject(CreatureRepositoryInjectionToken);

  for (const [, intention] of globalIntentionStorage) {
    if (intention.createdAt >= start && intention.createdAt <= end) {
      const [sourceUser, sourceCreature, targetUser, targetCreature] = await Promise.all([
        await userStorage.getUserByCreatureId(intention.sourceCreatureId),
        await creatureStorage.getFlatCreatureById(intention.sourceCreatureId),
        intention.targetCreatureId === null ? null : await userStorage.getUserByCreatureId(intention.targetCreatureId),
        intention.targetCreatureId === null ? null : await creatureStorage.getFlatCreatureById(intention.targetCreatureId),
      ]);

      if (sourceUser === null || sourceCreature === null) continue;
      result.push(
        globalIntentionTransform.toGlobalIntentionWithDependencies(intention, { sourceUser, sourceCreature, targetUser, targetCreature }),
      );
    }
  }
  result.sort((a, b) => a.createdAt.getTime() - b.createdAt.getTime());
  return result;
};

export const getGlobalMapRepository = () => {
  init();
  return <const>{
    [typeKey]: GlobalMapRepositoryTypeSymbol,
    getMapById,
    getLocationById,
    getNearestLocationsForMap,
    createGlobalIntention,
    getIntentionListByTimeRange,
  };
};

export type GlobalMapRepository = ReturnType<typeof getGlobalMapRepository>;
