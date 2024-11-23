import type { UUIDv4 } from '#lib/utils';

import type { User } from '#modules/StorageUser/@types';
import type { Creature, Skill } from '#modules/StorageCreature/@types';

export interface GlobalMap {
  id: UUIDv4;
  sizeX: number;
  sizeY: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface GlobalLocation {
  id: UUIDv4;
  coordinateX: number;
  coordinateY: number;
  mapId: UUIDv4;
  battleMapTemplateId: UUIDv4;
  moveCost: number;
  canMove: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface GlobalLocationDependencies {
  creatures: Creature[];
}

export interface GlobalLocationWithDependencies extends GlobalLocation, GlobalLocationDependencies {

}

export interface GlobalIntention {
  id: UUIDv4;
  sourceCreatureId: UUIDv4;
  targetCreatureId: UUIDv4 | null;
  targetGlobalLocationId: UUIDv4 | null;
  skillId: UUIDv4;
  createdAt: Date;
  updatedAt: Date;
}

export interface GlobalIntentionDependencies {
  sourceUser: User;
  sourceCreature: Creature;
  targetUser: User | null;
  targetCreature: Creature | null;
  targetGlobalLocation: GlobalLocation | null;
  skill: Skill;
}

export interface GlobalIntentionWithDependencies extends GlobalIntention, GlobalIntentionDependencies {

}
