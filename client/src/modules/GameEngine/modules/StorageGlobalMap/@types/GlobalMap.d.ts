import type { UUIDv4 } from '#lib/utils';

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

export interface GlobalIntention {
  id: UUIDv4;
  sourceCreatureId: UUIDv4;
  targetCreatureId: UUIDv4 | null;
  targetGlobalLocationId: UUIDv4 | null;
  skillId: UUIDv4;
  createdAt: Date;
  updatedAt: Date;
}
